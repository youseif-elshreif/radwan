import api from "@/utils/api";
import type {
  LoginCredentials,
  AuthResponse,
  StudentDashboardData,
  InstructorDashboardData,
  ParentDashboardData,
  User,
  Enrollment,
  ExamResult,
  LectureAttendance,
  Course,
  Lecture,
  Child,
  Payment,
  PendingEnrollment,
  StudentUser,
  Instructor,
  Parent,
  DashboardStats,
  Notification,
} from "@/types";

// ======================================
// Authentication API Functions
// ======================================

/**
 * Login for students and parents
 */
export const loginStudentOrParent = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    // Mock implementation - in real app this would hit actual backend
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Find user by phone or email
    const usersResponse = await api.get("/users");
    const users: User[] = usersResponse.data;

    const user = users.find(
      (u) =>
        u.phone_number1 === credentials.identifier ||
        u.email === credentials.identifier
    );

    if (!user || (user.role !== "student" && user.role !== "parent")) {
      return {
        success: false,
        message: "بيانات تسجيل الدخول غير صحيحة",
      };
    }

    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user,
      token: "mock-jwt-token",
      role: user.role,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول",
    };
  }
};

/**
 * Login for instructors
 */
export const loginInstructor = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const usersResponse = await api.get("/users");
    const users: User[] = usersResponse.data;

    const user = users.find(
      (u) =>
        (u.phone_number1 === credentials.identifier ||
          u.email === credentials.identifier) &&
        u.role === "instructor"
    );

    if (!user) {
      return {
        success: false,
        message: "بيانات تسجيل الدخول غير صحيحة",
      };
    }

    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user,
      token: "mock-jwt-token",
      role: user.role,
    };
  } catch (error) {
    console.error("Instructor login error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول",
    };
  }
};

// ======================================
// Dashboard API Functions
// ======================================

/**
 * Get student dashboard data
 */
export const getStudentDashboard = async (
  studentId: string
): Promise<StudentDashboardData> => {
  try {
    // Get student user info
    const studentResponse = await api.get(
      `/student_users/${studentId}?_expand=user`
    );
    const student: StudentUser = studentResponse.data;

    // Get enrollments with course data
    const enrollmentsResponse = await api.get(
      `/enrollments?student_id=${studentId}&_expand=course`
    );
    const enrollments: Enrollment[] = enrollmentsResponse.data;

    // Get exam results
    const examResultsResponse = await api.get(
      `/exam_results?student_id=${studentId}&_expand=exam`
    );
    const examResults: ExamResult[] = examResultsResponse.data;

    // Get attendance records
    const attendancesResponse = await api.get(
      `/lecture_attendances?student_id=${studentId}&_expand=lecture`
    );
    const attendances: LectureAttendance[] = attendancesResponse.data;

    // Get upcoming lectures
    const courseIds = enrollments.map((e) => e.course_id);
    const upcomingLectures: Lecture[] = [];

    for (const courseId of courseIds) {
      const lecturesResponse = await api.get(
        `/lectures?course_id=${courseId}&status=scheduled&_sort=scheduled_at&_order=asc&_limit=3`
      );
      upcomingLectures.push(...lecturesResponse.data);
    }

    // Calculate stats
    const stats: DashboardStats = {
      activeCourses: enrollments.filter((e) => e.active).length,
      totalAttendances: attendances.filter((a) => a.present).length,
      averageRating:
        examResults.length > 0
          ? examResults.reduce((sum, r) => sum + r.percentage, 0) /
            examResults.length
          : 0,
      completionPercentage:
        enrollments.length > 0
          ? (enrollments.filter((e) => e.status === "completed").length /
              enrollments.length) *
            100
          : 0,
    };

    // Mock notifications
    const notifications: Notification[] = [
      {
        id: "1",
        title: "درجة جديدة",
        message: "تم رفع درجة اختبار التجويد الأخير",
        type: "success",
        read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "محاضرة قادمة",
        message: "محاضرة البرمجة غداً الساعة 4:00 مساءً",
        type: "info",
        read: false,
        created_at: new Date().toISOString(),
      },
    ];

    return {
      student,
      enrollments,
      examResults,
      attendances,
      stats,
      upcomingLectures,
      notifications,
    };
  } catch (error) {
    console.error("Failed to fetch student dashboard:", error);
    throw error;
  }
};

/**
 * Get instructor dashboard data
 */
export const getInstructorDashboard = async (
  instructorId: string
): Promise<InstructorDashboardData> => {
  try {
    // Get instructor info with user data
    const instructorResponse = await api.get(
      `/instructors/${instructorId}?_expand=user`
    );
    const instructor: Instructor = instructorResponse.data;

    // Get courses taught by this instructor
    const coursesResponse = await api.get(
      `/courses?instructor_id=${instructorId}`
    );
    const courses: Course[] = coursesResponse.data;

    // Get lectures for these courses
    const lectures: Lecture[] = [];
    const attendances: LectureAttendance[] = [];

    for (const course of courses) {
      const lecturesResponse = await api.get(
        `/lectures?course_id=${course.id}&_sort=scheduled_at&_order=desc`
      );
      lectures.push(...lecturesResponse.data);

      // Get attendance for these lectures
      for (const lecture of lecturesResponse.data) {
        const attendanceResponse = await api.get(
          `/lecture_attendances?lecture_id=${lecture.id}`
        );
        attendances.push(...attendanceResponse.data);
      }
    }

    // Get upcoming lectures
    const upcomingLectures = lectures
      .filter(
        (l) => l.status === "scheduled" && new Date(l.scheduled_at) > new Date()
      )
      .slice(0, 5);

    // Calculate stats
    const totalStudents = courses.reduce(
      (sum, c) => sum + (c.enrolled_count || 0),
      0
    );
    const averageAttendance =
      attendances.length > 0
        ? (attendances.filter((a) => a.present).length / attendances.length) *
          100
        : 0;

    const stats: DashboardStats = {
      activeCourses: courses.filter((c) => c.is_active).length,
      studentsCount: totalStudents,
      averageRating: instructor.avg_rating || 0,
      totalAttendances: Math.round(averageAttendance),
    };

    return {
      instructor,
      courses,
      lectures,
      attendances,
      stats,
      upcomingLectures,
    };
  } catch (error) {
    console.error("Failed to fetch instructor dashboard:", error);
    throw error;
  }
};

/**
 * Get parent dashboard data
 */
export const getParentDashboard = async (
  parentId: string
): Promise<ParentDashboardData> => {
  try {
    // Get parent info with user data
    const parentResponse = await api.get(`/parents/${parentId}?_expand=user`);
    const parent: Parent = parentResponse.data;

    // Get children
    const childrenResponse = await api.get(`/children?parent_id=${parentId}`);
    const children: Child[] = childrenResponse.data;

    // Get enrollments for all children
    const enrollments: Enrollment[] = [];
    for (const child of children) {
      const enrollmentResponse = await api.get(
        `/enrollments?child_id=${child.id}&_expand=course`
      );
      enrollments.push(...enrollmentResponse.data);
    }

    // Get payments made by this parent
    const paymentsResponse = await api.get(
      `/payments?payer_parent_id=${parentId}`
    );
    const payments: Payment[] = paymentsResponse.data;

    // Get pending enrollments
    const pendingResponse = await api.get(
      `/pending_enrollments?parent_id=${parentId}&_expand=course`
    );
    const pendingEnrollments: PendingEnrollment[] = pendingResponse.data;

    // Calculate stats
    const totalPayments = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const activeEnrollments = enrollments.filter((e) => e.active).length;
    const pendingCount = pendingEnrollments.filter(
      (p) => p.status === "pending"
    ).length;

    const stats: DashboardStats = {
      activeCourses: activeEnrollments,
      totalAttendances: 0,
      totalPayments: totalPayments,
      pendingEnrollments: pendingCount,
      averageRating: 0, // Not applicable for parents
    };

    return {
      parent,
      children,
      enrollments,
      payments,
      pendingEnrollments,
      stats,
    };
  } catch (error) {
    console.error("Failed to fetch parent dashboard:", error);
    throw error;
  }
};

// ======================================
// Specific API Functions
// ======================================

/**
 * Post lecture attendance (mock)
 */
export const postLectureAttendance = async (
  lectureId: string,
  payload: {
    studentId?: string;
    childId?: string;
    present: boolean;
    rating?: number;
    notes?: string;
  }[]
): Promise<{ success: boolean; message: string }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock implementation
    console.log("Posting attendance for lecture:", lectureId, payload);

    return {
      success: true,
      message: "تم حفظ الحضور بنجاح",
    };
  } catch (error) {
    console.error("Failed to post attendance:", error);
    throw error;
  }
};

/**
 * Get payments by parent
 */
export const getPaymentsByParent = async (
  parentId: string
): Promise<Payment[]> => {
  try {
    const response = await api.get(`/payments?payer_parent_id=${parentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    throw error;
  }
};

/**
 * Get user by ID with role-specific data
 */
export const getUserWithRole = async (
  userId: string
): Promise<{
  user: User;
  roleData: StudentUser | Instructor | Parent | null;
}> => {
  try {
    const userResponse = await api.get(`/users/${userId}`);
    const user: User = userResponse.data;

    let roleData = null;

    switch (user.role) {
      case "student":
        const studentResponse = await api.get(
          `/student_users?user_id=${userId}`
        );
        roleData = studentResponse.data[0];
        break;
      case "instructor":
        const instructorResponse = await api.get(
          `/instructors?user_id=${userId}`
        );
        roleData = instructorResponse.data[0];
        break;
      case "parent":
        const parentResponse = await api.get(`/parents?user_id=${userId}`);
        roleData = parentResponse.data[0];
        break;
    }

    return {
      user,
      roleData,
    };
  } catch (error) {
    console.error("Failed to fetch user with role:", error);
    throw error;
  }
};

/**
 * Get child's age calculation
 */
export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
