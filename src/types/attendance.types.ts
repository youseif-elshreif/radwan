import { Child, StudentUser } from "./user.types";
import { Lecture } from "./academic.types";

// Attendance tracking types
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
