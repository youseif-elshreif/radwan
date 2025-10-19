// API Client
export { default as apiClient, API_BASE_URL } from "./client";

// Authentication
export { authApi } from "./auth";
export { default as auth } from "./auth";

// Courses
export { coursesApi } from "./courses";
export { default as courses } from "./courses";

// Dashboard
export { dashboardApi } from "./dashboard";
export { default as dashboard } from "./dashboard";

// Statistics
export { statsApi } from "./stats";
export { default as stats } from "./stats";

// Testimonials
export { testimonialsApi } from "./testimonials";
export { default as testimonials } from "./testimonials";

// Users
export { usersApi } from "./users";
export { default as users } from "./users";

// Utilities
export { utilsApi } from "./utils";
export { default as utils } from "./utils";

// Legacy exports for backward compatibility (to be used temporarily)
import { authApi } from "./auth";
import { coursesApi } from "./courses";
import { dashboardApi } from "./dashboard";
import { statsApi } from "./stats";
import { testimonialsApi } from "./testimonials";
import { usersApi } from "./users";
import { utilsApi } from "./utils";

export const { loginStudentOrParent, loginInstructor } = authApi;

export const {
  getFeaturedCourses,
  getCourses,
  getSeasons,
  getTags,
  getInstructors,
} = coursesApi;

export const {
  getStudentDashboard,
  getInstructorDashboard,
  getParentDashboard,
} = dashboardApi;

export const { getStats } = statsApi;

export const { getTestimonials } = testimonialsApi;

export const { postLectureAttendance, getPaymentsByParent, getUserWithRole } =
  usersApi;

export const { calculateAge } = utilsApi;
