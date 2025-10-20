import { Course } from "./course.types";
import { Instructor } from "./user.types";

// Academic activity types
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
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";
