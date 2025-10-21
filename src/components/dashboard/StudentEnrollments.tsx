import React, { useState, useEffect } from "react";
import { EnrollmentWithCourse } from "@/types/enrollment";
import { enrollmentsApi } from "@/api/enrollments";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FaBook, FaCalendar, FaClock, FaUser, FaSpinner } from "react-icons/fa";

const StudentEnrollments: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const data = await enrollmentsApi.getStudentEnrollmentsWithCourses(
          user.id
        );
        setEnrollments(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError("فشل في تحميل التسجيلات");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "pending":
        return "معلق";
      case "rejected":
        return "مرفوض";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!loading) {
    return (
      <div className="text-center py-8">
        <FaSpinner className="animate-spin text-3xl text-primary mx-auto mb-4" />
        <p className="text-text-muted">جاري تحميل التسجيلات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
          <FaBook className="text-primary text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">
          لم تسجل في أي دورة بعد
        </h3>
        <p className="text-text-muted mb-6">
          استكشف الدورات المتاحة وابدأ رحلتك التعليمية
        </p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/courses")}
        >
          تصفح الدورات
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">تسجيلاتي</h2>
        <span className="text-text-muted">
          {enrollments.length} {enrollments.length === 1 ? "دورة" : "دورات"}
        </span>
      </div>

      <div className="grid gap-6">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text">
                    {enrollment.course.name}
                  </h3>
                  <Badge className={getStatusColor(enrollment.status)}>
                    {getStatusText(enrollment.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary" />
                    <span>{enrollment.course.instructor_name || "المدرب"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-primary" />
                    <span>{formatDate(enrollment.course.start_date)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-primary" />
                    <span>
                      تاريخ التسجيل: {formatDate(enrollment.createdAt)}
                    </span>
                  </div>
                </div>

                {enrollment.notes && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">{enrollment.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/courses/${enrollment.course.id}`)
                  }
                >
                  عرض التفاصيل
                </Button>

                {enrollment.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      // TODO: إضافة منطق إلغاء التسجيل
                      console.log("Cancel enrollment", enrollment.id);
                    }}
                  >
                    إلغاء التسجيل
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEnrollments;
