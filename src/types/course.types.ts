import { Instructor } from "./user.types";

// Course-related core types
export interface Season {
  id: string;
  name: string;
  season_type: "summer_camp" | "school" | "ramadan" | "eid" | "other";
  start_date: string;
  end_date: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  created_at?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  season_id?: string;
  start_date: string;
  end_date: string;
  num_lectures: number;
  capacity: number;
  price: number;
  instructor_id?: string;
  enrolled_count?: number;
  is_active?: boolean;
  thumbnail?: string;
  tags?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
  instructor?: Instructor;
  season?: Season;
}

// Course filter types
export interface CourseFilters {
  search?: string;
  tags?: string[];
  category?: string[];
  season_id?: string;
  instructor_id?: string;
  featured?: boolean;
  is_active?: boolean;
}

export interface ExtendedFilters extends CourseFilters {
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  level?: string;
  category?: string[];
}

export interface SearchFilters {
  search: string;
  category: string[];
  season: string;
  instructor: string;
  priceRange: { min: number; max: number };
  ageRange?: { min: number; max: number };
  sortBy: "name" | "price" | "date" | "rating";
  sortOrder: "asc" | "desc";
}

export type CourseStatus = "active" | "completed" | "cancelled" | "suspended";
