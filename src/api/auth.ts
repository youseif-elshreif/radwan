import apiClient from "./client";
import type { LoginCredentials, AuthResponse, User } from "@/types";

// ======================================
// Authentication API Functions
// ======================================

export const authApi = {
  /**
   * Login for students and parents
   */
  loginStudentOrParent: async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      // Mock implementation - in real app this would hit actual backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      // Find user by phone or email
      const usersResponse = await apiClient.get("/users");
      const users: User[] = usersResponse.data;

      const user = users.find(
        (u) =>
          u.phone_number1 === credentials.identifier ||
          u.email === credentials.identifier
      );

      if (!user || (user.role !== "student" && user.role !== "parent")) {
        return {
          success: false,
          message: "بيانات تسجيل الدخول غير صحيحة",
        };
      }

      return {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user,
        token: "mock-jwt-token",
        role: user.role,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "حدث خطأ أثناء تسجيل الدخول",
      };
    }
  },

  /**
   * Login for instructors
   */
  loginInstructor: async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const usersResponse = await apiClient.get("/users");
      const users: User[] = usersResponse.data;

      const user = users.find(
        (u) =>
          (u.phone_number1 === credentials.identifier ||
            u.email === credentials.identifier) &&
          u.role === "instructor"
      );

      if (!user) {
        return {
          success: false,
          message: "بيانات تسجيل الدخول غير صحيحة",
        };
      }

      return {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user,
        token: "mock-jwt-token",
        role: user.role,
      };
    } catch (error) {
      console.error("Instructor login error:", error);
      return {
        success: false,
        message: "حدث خطأ أثناء تسجيل الدخول",
      };
    }
  },
};

export default authApi;
