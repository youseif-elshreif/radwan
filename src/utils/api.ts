﻿import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { RefreshTokenResponse } from "@/types/auth.types";
import {
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./authUtils";

// Extend request config interface
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuthInterceptor?: boolean;
}

// API Base URL from environment variables
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001" ||
  "http://localhost:4000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Log network requests for debugging purposes
const logRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};

// Add auth header to requests if token exists
const addAuthHeader = (config: InternalAxiosRequestConfig) => {
  // Skip adding auth header if skipAuthInterceptor is true
  const extendedConfig = config as ExtendedAxiosRequestConfig;
  if (extendedConfig.skipAuthInterceptor) {
    return config;
  }

  const token = getAccessToken();
  if (token) {
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Request interceptors
api.interceptors.request.use(logRequest);
api.interceptors.request.use(addAuthHeader);

// Response interceptors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt to refresh the token if we get a 401 and haven't tried yet
    // Also skip if this is already a refresh request or if skipAuthInterceptor is true
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthInterceptor &&
      originalRequest.url !== "/auth/refresh-token" &&
      originalRequest.url !== "/api/auth/refresh-token"
    ) {
      if (isRefreshing) {
        try {
          // Wait for the current refresh to complete
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (!originalRequest.headers) {
            originalRequest.headers = new axios.AxiosHeaders();
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use skipAuthInterceptor to prevent infinite loops
        const { data } = await api.post<RefreshTokenResponse>(
          `/auth/refresh-token`,
          {},
          {
            skipAuthInterceptor: true,
            withCredentials: true,
          } as ExtendedAxiosRequestConfig
        );

        const newToken = data.accessToken;

        // Update stored token
        saveAccessToken(newToken);

        // Process queue with new token
        processQueue(null, newToken);

        // Return original request with new token
        if (!originalRequest.headers) {
          originalRequest.headers = new axios.AxiosHeaders();
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);

        removeAccessToken();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
