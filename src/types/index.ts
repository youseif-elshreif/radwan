// Main index file - exports all types from organized modules

// User-related types
export * from "./user.types";

// Course-related types
export * from "./course.types";

// Academic activity types
export * from "./academic.types";

// Attendance types
export * from "./attendance.types";

// Enrollment and payment types
export * from "./enrollment.types";

// Rating and feedback types
export * from "./rating.types";

// Dashboard types
export * from "./dashboard.types";

// API types
export * from "./api.types";

// UI component types
export * from "./ui.types";

// Course-specific types (from course.ts) - for backward compatibility
export type { CourseWithDetails, Review } from "./course";

// Auth types - keeping separate to avoid conflicts
export type {
  RegisterFormData,
  LoginFormData,
  RegisterData,
} from "./auth.types";
