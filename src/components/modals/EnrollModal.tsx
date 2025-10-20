import React, { useState } from "react";
import { CourseWithDetails } from "@/types/course";
import { EnrollmentRequest } from "@/types/enrollment";
import { enrollmentsApi } from "@/api/enrollments";
import EnrollModalHeader from "./EnrollModalHeader";
import EnrollModalBody from "./EnrollModalBody";
import EnrollModalActions from "./EnrollModalActions";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseWithDetails;
  studentId: number;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  course,
  studentId,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const seatsAvailable = course.capacity > course.enrolled_count;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Check if student is already enrolled
      const isAlreadyEnrolled = await enrollmentsApi.checkExistingEnrollment(
        studentId.toString(),
        course.id.toString()
      );

      if (isAlreadyEnrolled) {
        onError("أنت مسجل بالفعل في هذه الدورة أو لديك طلب معلق");
        onClose();
        return;
      }

      // Create enrollment request
      const enrollmentData: EnrollmentRequest = {
        studentId: studentId.toString(),
        courseId: course.id.toString(),
        amount: course.price,
      };

      await enrollmentsApi.createEnrollment(enrollmentData);

      // Success message
      const successMessage = seatsAvailable
        ? `تم إرسال طلب تسجيلك في دورة "${course.name}" بنجاح! يرجى زيارة الأكاديمية خلال 48 ساعة لاستكمال إجراءات الدفع.`
        : `تم إضافتك إلى قائمة الانتظار لدورة "${course.name}". سيتم التواصل معك عند توفر مقعد.`;

      onSuccess(successMessage);
      onClose();
    } catch (error: unknown) {
      console.error("Error enrolling in course:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.";
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
          <EnrollModalHeader courseName={course.name} onClose={onClose} />

          <EnrollModalBody course={course} />

          <EnrollModalActions
            onCancel={onClose}
            onConfirm={handleConfirm}
            loading={loading}
            seatsAvailable={seatsAvailable}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;
