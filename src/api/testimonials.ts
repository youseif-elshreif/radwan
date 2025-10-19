import apiClient from "./client";
import type { Testimonial } from "@/types";

// ======================================
// Testimonials API Functions
// ======================================

export const testimonialsApi = {
  /**
   * Get testimonials for the homepage
   */
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await apiClient.get("/testimonials");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      throw error;
    }
  },
};

export default testimonialsApi;
