// Core Types
export interface User {
  id: string;
  phone_number1?: string;
  phone_number2?: string;
  email?: string;
  first_name: string;
  last_name: string;
  role?: "parent" | "student" | "instructor" | "admin" | "superadmin";
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

// Course Related Types
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

// Lecture & Attendance Types
export interface Lecture {
  id: string;
  course_id: string;
  scheduled_at: string;
  lecture_number: number;
  start_time?: string;
  end_time?: string;
  instructor_id?: string;
  status?: "scheduled" | "completed" | "cancelled";
  created_at?: string;
  updated_at?: string;
  course?: Course;
  instructor?: Instructor;
}

export interface LectureAttendance {
  id: string;
  lecture_id: string;
  child_id?: string;
  student_id?: string;
  present?: boolean;
  rating?: number;
  notes?: string;
  marked_by: string;
  marked_at?: string;
  created_at?: string;
  updated_at?: string;
  lecture?: Lecture;
  child?: Child;
  student?: StudentUser;
}

// Exam Types
export interface Exam {
  id: string;
  course_id: string;
  name: string;
  exam_type?: "quiz" | "midterm" | "final" | "assignment" | "other";
  scheduled_date: string;
  total_marks: number;
  description?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  course?: Course;
}

export interface ExamResult {
  id: string;
  exam_id: string;
  child_id?: string;
  student_id?: string;
  marks_obtained: number;
  percentage: number;
  notes?: string;
  entered_by: string;
  entered_at?: string;
  created_at?: string;
  updated_at?: string;
  exam?: Exam;
  child?: Child;
  student?: StudentUser;
}

// Enrollment & Payment Types
export interface Enrollment {
  id: string;
  course_id: string;
  student_id?: string;
  child_id?: string;
  enrolled_at: string;
  active?: boolean;
  status?: "active" | "completed" | "dropped" | "suspended";
  created_by: string;
  created_at?: string;
  updated_at?: string;
  course?: Course;
  student?: StudentUser;
  child?: Child;
}

export interface PendingEnrollment {
  id: string;
  course_id: string;
  parent_id?: string;
  student_id?: string;
  child_id?: string;
  status?: "pending" | "cancelled" | "expired" | "accepted";
  price: number;
  created_at: string;
  expires_at?: string;
  notes?: string;
  processed_by?: string;
  processed_at?: string;
  course?: Course;
  parent?: Parent;
  student?: StudentUser;
  child?: Child;
}

export interface Payment {
  id: string;
  pending_enrollment_id?: string;
  enrollment_id?: string;
  payer_parent_id?: string;
  payer_student_id?: string;
  amount: number;
  method?:
    | "cash"
    | "card"
    | "bank_transfer"
    | "instapay"
    | "vodafone_cash"
    | "other";
  status?: "pending" | "paid" | "refunded" | "void";
  payment_date?: string;
  processed_by?: string;
  reference_number?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Rating Types
export interface StudentInstructorRating {
  id: string;
  course_id: string;
  instructor_id: string;
  child_id?: string;
  student_id?: string;
  rating: number;
  feedback?: string;
  rated_at: string;
  course?: Course;
  instructor?: Instructor;
  child?: Child;
  student?: StudentUser;
}

// Dashboard Specific Types
export interface DashboardStats {
  activeCourses: number;
  totalAttendances: number;
  averageRating: number;
  completionPercentage?: number;
  studentsCount?: number;
  totalPayments?: number;
  pendingEnrollments?: number;
}

export interface StudentDashboardData {
  student: StudentUser;
  enrollments: Enrollment[];
  examResults: ExamResult[];
  attendances: LectureAttendance[];
  stats: DashboardStats;
  upcomingLectures: Lecture[];
  notifications: Notification[];
}

export interface InstructorDashboardData {
  instructor: Instructor;
  courses: Course[];
  lectures: Lecture[];
  attendances: LectureAttendance[];
  stats: DashboardStats;
  upcomingLectures: Lecture[];
}

export interface ParentDashboardData {
  parent: Parent;
  children: Child[];
  enrollments: Enrollment[];
  payments: Payment[];
  pendingEnrollments: PendingEnrollment[];
  stats: DashboardStats;
}

// Notification Type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  created_at: string;
}

// Auth Types
export interface LoginCredentials {
  identifier: string; // phone or email
  password: string;
  remember?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  role?: string;
}

// Filter Types (from previous implementation)
export interface CourseFilters {
  search?: string;
  tags?: string[];
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
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Utility Types
export type UserRole =
  | "parent"
  | "student"
  | "instructor"
  | "admin"
  | "superadmin";
export type AttendanceStatus = "present" | "absent" | "late" | "excused";
export type CourseStatus = "active" | "completed" | "cancelled" | "suspended";
export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "instapay"
  | "vodafone_cash"
  | "other";
export type PaymentStatus = "pending" | "paid" | "refunded" | "void";
