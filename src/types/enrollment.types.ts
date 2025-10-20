import { Parent, Child, StudentUser } from "./user.types";
import { Course } from "./course.types";

// Enrollment and payment types
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
  method?: PaymentMethod;
  status?: PaymentStatus;
  payment_date?: string;
  processed_by?: string;
  reference_number?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Payment related types
export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "instapay"
  | "vodafone_cash"
  | "other";

export type PaymentStatus = "pending" | "paid" | "refunded" | "void";
