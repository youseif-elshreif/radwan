import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { RefreshTokenResponse } from "@/types/auth.types";
import {
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./authUtils";

// API Base URL from environment variables
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"; // Changed to use json-server proxy

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
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt to refresh the token if we get a 401 and haven't tried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh-token"
    ) {
      if (isRefreshing) {
        try {
          // Wait for the current refresh to complete
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post<RefreshTokenResponse>(
          `/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: undefined,
            },
          }
        );

        const newToken = data.accessToken;

        // Update stored token
        saveAccessToken(newToken);

        // Process queue with new token
        processQueue(null, newToken);

        // Return original request with new token
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

// ======================================
// Al-Radwan Academy API Functions
// ======================================

import { Course, Testimonial, Stats } from "@/types";

/**
 * Get featured courses for the homepage
 */
export const getFeaturedCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get("/courses?featured=true");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch featured courses:", error);
    throw error;
  }
};

/**
 * Get courses with optional query parameters for filtering
 */
export const getCourses = async (
  query?: Record<string, string | number>
): Promise<Course[]> => {
  try {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/courses?${queryString}` : "/courses";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};

/**
 * Get testimonials for the homepage
 */
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await api.get("/testimonials");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    throw error;
  }
};

/**
 * Get statistics for counters on homepage
 */
export const getStats = async (): Promise<Stats> => {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    throw error;
  }
};

/**
 * Get all seasons for filter dropdown
 */
export const getSeasons = async () => {
  try {
    const response = await api.get("/seasons");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch seasons:", error);
    throw error;
  }
};

/**
 * Get all tags for filter chips
 */
export const getTags = async () => {
  try {
    const response = await api.get("/tags");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    throw error;
  }
};

/**
 * Get all instructors
 */
export const getInstructors = async () => {
  try {
    const response = await api.get("/instructors");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructors:", error);
    throw error;
  }
};
