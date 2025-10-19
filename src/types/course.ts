export interface Review {
  student: string;
  rating: number;
  comment: string;
}

// Course interface that matches db.json structure
export interface Course {
  id: string;
  name: string;
  description: string;
  season_id: string;
  start_date: string;
  end_date: string;
  num_lectures: number;
  capacity: number;
  price: number;
  instructor_id: string;
  enrolled_count: number;
  is_active: boolean;
  thumbnail: string;
  tags: string[];
  featured: boolean;
  rating?: number;
  reviews?: Review[];
  // For display purposes (computed fields)
  instructor_name?: string;
  duration?: string;
  category?: string;
}

// Extended Course for display purposes
export interface CourseWithDetails {
  id: string;
  name: string;
  description: string;
  season_id: string;
  start_date: string;
  end_date: string;
  num_lectures: number;
  capacity: number;
  price: number;
  instructor_id: string;
  enrolled_count: number;
  is_active: boolean;
  thumbnail: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviews: Review[];
  instructor_name: string;
  duration: string;
  category: string;
}