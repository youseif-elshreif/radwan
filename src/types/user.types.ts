// Core user-related types
export interface User {
  id: string;
  phone_number1?: string;
  phone_number2?: string;
  email?: string;
  first_name: string;
  last_name: string;
  role?: UserRole;
  national_id?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Parent {
  id: string;
  user_id: string;
  user?: User;
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  cached_age?: number;
  unique_code?: string;
  photo_url?: string;
  status?: "active" | "inactive" | "graduated";
  created_at?: string;
  updated_at?: string;
}

export interface StudentUser {
  id: string;
  user_id: string;
  unique_code?: string;
  user?: User;
}

export interface Instructor {
  id: string;
  user_id: string;
  bio?: string;
  monthly_salary?: number;
  hire_date?: string;
  avg_rating?: number;
  user?: User;
}

// User role types
export type UserRole =
  | "parent"
  | "student"
  | "instructor"
  | "admin"
  | "superadmin";
