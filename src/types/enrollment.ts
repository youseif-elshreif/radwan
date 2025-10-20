// Enrollment types for course registration system
export interface Enrollment {
  id: number;
  studentId: string;
  courseId: string;
  status: "pending" | "active" | "rejected";
  paymentConfirmed: boolean;
  createdAt: string;
  updatedAt?: string;
  rejectionReason?: string;
  paymentMethod?: "cash" | "card" | "bank_transfer" | "online";
  amount?: number;
  notes?: string;
}

export interface EnrollmentRequest {
  studentId: string;
  courseId: string;
  amount?: number;
  notes?: string;
}

export interface EnrollmentUpdateRequest {
  status?: "pending" | "active" | "rejected";
  paymentConfirmed?: boolean;
  rejectionReason?: string;
  paymentMethod?: "cash" | "card" | "bank_transfer" | "online";
  notes?: string;
}

export type EnrollmentStatus = "pending" | "active" | "rejected";

export interface EnrollmentWithCourse extends Enrollment {
  course: {
    id: string;
    name: string;
    price: number;
    instructor_name?: string;
    thumbnail?: string;
    start_date: string;
    end_date: string;
  };
}
