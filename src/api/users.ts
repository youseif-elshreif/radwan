import apiClient from "./client";
import type { User, StudentUser, Instructor, Parent, Payment } from "@/types";

// ======================================
// Users API Functions
// ======================================

export const usersApi = {
  /**
   * Post lecture attendance (mock)
   */
  postLectureAttendance: async (
    lectureId: string,
    payload: {
      studentId?: string;
      childId?: string;
      present: boolean;
      rating?: number;
      notes?: string;
    }[]
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock implementation
      console.log("Posting attendance for lecture:", lectureId, payload);

      return {
        success: true,
        message: "تم حفظ الحضور بنجاح",
      };
    } catch (error) {
      console.error("Failed to post attendance:", error);
      throw error;
    }
  },

  /**
   * Get payments by parent
   */
  getPaymentsByParent: async (parentId: string): Promise<Payment[]> => {
    try {
      const response = await apiClient.get(
        `/payments?payer_parent_id=${parentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      throw error;
    }
  },

  /**
   * Get user by ID with role-specific data
   */
  getUserWithRole: async (
    userId: string
  ): Promise<{
    user: User;
    roleData: StudentUser | Instructor | Parent | null;
  }> => {
    try {
      const userResponse = await apiClient.get(`/users/${userId}`);
      const user: User = userResponse.data;

      let roleData = null;

      switch (user.role) {
        case "student":
          const studentResponse = await apiClient.get(
            `/student_users?user_id=${userId}`
          );
          roleData = studentResponse.data[0];
          break;
        case "instructor":
          const instructorResponse = await apiClient.get(
            `/instructors?user_id=${userId}`
          );
          roleData = instructorResponse.data[0];
          break;
        case "parent":
          const parentResponse = await apiClient.get(
            `/parents?user_id=${userId}`
          );
          roleData = parentResponse.data[0];
          break;
      }

      return {
        user,
        roleData,
      };
    } catch (error) {
      console.error("Failed to fetch user with role:", error);
      throw error;
    }
  },
};

export default usersApi;
