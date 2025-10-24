// authUtils.ts - Secure helper functions for authentication
import api from "./api";

// In-memory token storage (cleared on page refresh)
let accessToken: string | null = null;

/**
 * Get the access token from memory
 */
export const getAccessToken = (): string | null => {
  return accessToken;
};

/**
 * Save the access token to memory only
 */
export const saveAccessToken = (token: string): void => {
  accessToken = token;
};

/**
 * Remove the access token from memory
 */
export const removeAccessToken = (): void => {
  accessToken = null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token && !isTokenExpired(token);
};

/**
 * Parse JWT token (without validation - client-side only)
 */
export const parseJwt = (token: string): Record<string, unknown> | null => {
  try {
    // Split the token and get the payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    throw e;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp || typeof decoded.exp !== "number") {
      return true;
    }
    // Check if expiration time is past current time (with 30 second buffer)
    return decoded.exp * 1000 < Date.now() + 30000;
  } catch {
    return true;
  }
};

/**
 * Handles logout - clears token and redirects to login
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint to clear HttpOnly refresh token cookie
    await api.post("/auth/logout", {});
  } catch (error) {
    // Continue with logout even if API call fails
    console.warn("Logout API call failed:", error);
  } finally {
    removeAccessToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
};

/**
 * Attempt to refresh the token when needed
 * Returns a promise that resolves to the new token if successful
 */
export const refreshToken = async (): Promise<string | null> => {
  try {
    // This will use the HttpOnly refresh token cookie automatically
    // Note: skipAuthInterceptor is handled in the api interceptor
    const response = await api.post<{ accessToken: string }>(
      "/auth/refresh-token",
      {}
    );
    const newToken = response.data.accessToken;
    saveAccessToken(newToken);
    return newToken;
  } catch (error) {
    // If refresh fails, user needs to login again
    removeAccessToken();
    throw error;
  }
};

/**
 * Check if token needs to be refreshed and refresh if needed
 * This can be called before making authenticated requests
 */
export const checkAndRefreshToken = async (): Promise<boolean> => {
  const token = getAccessToken();

  if (!token) {
    // Try to get a new token using refresh token
    try {
      const newToken = await refreshToken();
      return !!newToken;
    } catch {
      return false;
    }
  }

  // If token is expired or will expire in the next 5 minutes, refresh it
  if (isTokenExpired(token)) {
    try {
      const newToken = await refreshToken();
      return !!newToken;
    } catch {
      return false;
    }
  }

  // Token is still valid
  return true;
};

/**
 * Initialize authentication state - call this on app startup
 * Tries to get a token using the refresh token if available
 */
export const initializeAuth = async (): Promise<boolean> => {
  try {
    // Try to refresh token on startup to get access token from refresh cookie
    const newToken = await refreshToken();
    return !!newToken;
  } catch {
    // No valid refresh token available
    return false;
  }
};
