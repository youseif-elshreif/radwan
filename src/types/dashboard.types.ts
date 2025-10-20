import { StudentUser, Instructor, Parent, Child } from "./user.types";
import { Course } from "./course.types";
import { Lecture, ExamResult } from "./academic.types";
import { LectureAttendance } from "./attendance.types";
import { Enrollment, Payment, PendingEnrollment } from "./enrollment.types";

// Dashboard statistics
export interface DashboardStats {
  activeCourses: number;
  totalAttendances: number;
  averageRating: number;
  completionPercentage?: number;
  studentsCount?: number;
  totalPayments?: number;
  pendingEnrollments?: number;
}

// Student dashboard data
export interface StudentDashboardData {
  student: StudentUser;
  enrollments: Enrollment[];
  examResults: ExamResult[];
  attendances: LectureAttendance[];
  stats: DashboardStats;
  upcomingLectures: Lecture[];
  notifications: Notification[];
}

// Instructor dashboard data
export interface InstructorDashboardData {
  instructor: Instructor;
  courses: Course[];
  lectures: Lecture[];
  attendances: LectureAttendance[];
  stats: DashboardStats;
  upcomingLectures: Lecture[];
}

// Parent dashboard data
export interface ParentDashboardData {
  parent: Parent;
  children: Child[];
  enrollments: Enrollment[];
  payments: Payment[];
  pendingEnrollments: PendingEnrollment[];
  stats: DashboardStats;
}

// Notification system
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  created_at: string;
}

// General statistics
export interface Stats {
  students: number;
  active_courses: number;
  seasons_completed: number;
}

// Testimonial type
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}
