import { Instructor, Child, StudentUser } from "./user.types";
import { Course } from "./course.types";

// Rating and feedback types
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
