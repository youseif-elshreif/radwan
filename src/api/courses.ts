import apiClient from "./client";
import { Course, CourseFilters } from "@/types";

export const coursesApi = {
  // Get all courses with optional filters
  getCourses: async (filters?: CourseFilters): Promise<Course[]> => {
    try {
      const params = new URLSearchParams();

      if (filters?.category) {
        params.append("tags_like", filters.category);
      }

      if (filters?.search) {
        params.append("name_like", filters.search);
      }

      const queryString = params.toString();
      const url = queryString ? `/courses?${queryString}` : "/courses";

      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get featured courses
  getFeaturedCourses: async (): Promise<Course[]> => {
    try {
      const response = await apiClient.get("/courses?featured=true");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (id: string): Promise<Course> => {
    try {
      const response = await apiClient.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },

  // Get courses by category
  getCoursesByCategory: async (category: string): Promise<Course[]> => {
    try {
      const response = await apiClient.get(`/courses?tags_like=${category}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses by category:", error);
      throw error;
    }
  },

  // Get available categories from all courses
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get("/courses");
      const courses: Course[] = response.data;

      const allTags = courses.flatMap((course) => course.tags || []);
      const uniqueCategories = Array.from(new Set(allTags));

      return uniqueCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};

export default coursesApi;
