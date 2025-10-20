import apiClient from "./client";
import { Enrollment, EnrollmentRequest, EnrollmentUpdateRequest, EnrollmentWithCourse } from "@/types/enrollment";

export const enrollmentsApi = {
  // Get all enrollments for a specific student
  getStudentEnrollments: async (studentId: string): Promise<Enrollment[]> => {
    try {
      const response = await apiClient.get<Enrollment[]>(`/enrollments?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student enrollments:", error);
      throw new Error("فشل في تحميل بيانات التسجيلات");
    }
  },

  // Get enrollments with course details
  getStudentEnrollmentsWithCourses: async (studentId: string): Promise<EnrollmentWithCourse[]> => {
    try {
      const enrollments = await enrollmentsApi.getStudentEnrollments(studentId);
      
      // Fetch course details for each enrollment
      const enrollmentsWithCourses = await Promise.all(
        enrollments.map(async (enrollment) => {
          try {
            const courseResponse = await apiClient.get(`/courses/${enrollment.courseId}`);
            return {
              ...enrollment,
              course: {
                id: courseResponse.data.id,
                name: courseResponse.data.name,
                price: courseResponse.data.price,
                instructor_name: courseResponse.data.instructor_name || `الأستاذ ${courseResponse.data.instructor_id}`,
                thumbnail: courseResponse.data.thumbnail,
                start_date: courseResponse.data.start_date,
                end_date: courseResponse.data.end_date,
              }
            } as EnrollmentWithCourse;
          } catch (error) {
            console.error(`Error fetching course ${enrollment.courseId}:`, error);
            // Return enrollment with fallback course data
            return {
              ...enrollment,
              course: {
                id: enrollment.courseId,
                name: "دورة غير متاحة",
                price: enrollment.amount || 0,
                instructor_name: "غير محدد",
                thumbnail: "",
                start_date: "",
                end_date: "",
              }
            } as EnrollmentWithCourse;
          }
        })
      );

      return enrollmentsWithCourses;
    } catch (error) {
      console.error("Error fetching enrollments with courses:", error);
      throw new Error("فشل في تحميل بيانات التسجيلات مع الكورسات");
    }
  },

  // Create new enrollment
  createEnrollment: async (enrollmentData: EnrollmentRequest): Promise<Enrollment> => {
    try {
      const newEnrollment = {
        ...enrollmentData,
        status: "pending" as const,
        paymentConfirmed: false,
        createdAt: new Date().toISOString(),
      };

      const response = await apiClient.post<Enrollment>("/enrollments", newEnrollment);
      return response.data;
    } catch (error) {
      console.error("Error creating enrollment:", error);
      throw new Error("فشل في إنشاء طلب التسجيل");
    }
  },

  // Update enrollment status (for admin use)
  updateEnrollment: async (id: number, updateData: EnrollmentUpdateRequest): Promise<Enrollment> => {
    try {
      const response = await apiClient.patch<Enrollment>(`/enrollments/${id}`, {
        ...updateData,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating enrollment:", error);
      throw new Error("فشل في تحديث بيانات التسجيل");
    }
  },

  // Cancel enrollment (student can cancel pending enrollments)
  cancelEnrollment: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/enrollments/${id}`);
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      throw new Error("فشل في إلغاء التسجيل");
    }
  },

  // Check if student is already enrolled in a course
  checkExistingEnrollment: async (studentId: string, courseId: string): Promise<boolean> => {
    try {
      const response = await apiClient.get<Enrollment[]>(
        `/enrollments?studentId=${studentId}&courseId=${courseId}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking existing enrollment:", error);
      return false;
    }
  },

  // Get enrollment by ID
  getEnrollmentById: async (id: number): Promise<Enrollment> => {
    try {
      const response = await apiClient.get<Enrollment>(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollment:", error);
      throw new Error("فشل في تحميل بيانات التسجيل");
    }
  },

  // Get enrollments by status
  getEnrollmentsByStatus: async (studentId: string, status: "pending" | "active" | "rejected"): Promise<EnrollmentWithCourse[]> => {
    try {
      const allEnrollments = await enrollmentsApi.getStudentEnrollmentsWithCourses(studentId);
      return allEnrollments.filter(enrollment => enrollment.status === status);
    } catch (error) {
      console.error("Error fetching enrollments by status:", error);
      throw new Error("فشل في تحميل التسجيلات");
    }
  }
};