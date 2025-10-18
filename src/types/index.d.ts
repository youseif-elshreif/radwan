// TypeScript interfaces for Al-Radwan Academy application

export interface User {
  id: string;
  phone_number1?: string;
  email?: string;
  first_name: string;
  last_name: string;
  role: "parent" | "student" | "instructor" | "admin";
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  dob: string;
}

export interface Instructor {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  bio?: string;
}

export interface Season {
  id: string;
  name: string;
  season_type: string;
  start_date: string;
  end_date: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  season_id?: string;
  start_date?: string;
  end_date?: string;
  num_lectures?: number;
  capacity?: number;
  price?: number;
  instructor_id?: string;
  enrolled_count?: number;
  is_active?: boolean;
  thumbnail?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: number;
}

export interface Stats {
  students: number;
  active_courses: number;
  seasons_completed: number;
}

// Component prop types
export interface SearchFilters {
  season?: string;
  category?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "error";
  className?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  role: "student" | "parent";
  acceptTerms: boolean;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: { min: number; max: number };
  search?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  className?: string;
}
