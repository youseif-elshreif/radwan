import apiClient from "./client";
import type { Stats } from "@/types";

// ======================================
// Statistics API Functions
// ======================================

export const statsApi = {
  /**
   * Get statistics for counters on homepage
   */
  getStats: async (): Promise<Stats> => {
    try {
      const response = await apiClient.get("/stats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      throw error;
    }
  },
};

export default statsApi;
