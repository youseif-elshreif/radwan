import React from "react";
import Image from "next/image";
import { CourseWithDetails } from "@/types/course";
import { FaChalkboardTeacher, FaClock, FaBook, FaCalendar, FaUsers } from "react-icons/fa";

interface EnrollModalBodyProps {
  course: CourseWithDetails;
}

const EnrollModalBody: React.FC<EnrollModalBodyProps> = ({ course }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const seatsLeft = course.capacity - course.enrolled_count;

  return (
    <div className="p-6 space-y-6">
      {/* Course Image and Basic Info */}
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={course.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <FaBook className="text-white text-2xl" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text mb-2">{course.name}</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      {/* Course Details Grid */}
      <div className="bg-surface rounded-lg p-4 border border-border">
        <h4 className="font-semibold text-text mb-4">تفاصيل الدورة</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-primary" />
            <span className="text-text-muted">المدرس:</span>
            <span className="font-medium">{course.instructor_name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span className="text-text-muted">المدة:</span>
            <span className="font-medium">{course.duration}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaBook className="text-primary" />
            <span className="text-text-muted">المحاضرات:</span>
            <span className="font-medium">{course.num_lectures} محاضرة</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaUsers className="text-primary" />
            <span className="text-text-muted">الأماكن المتبقية:</span>
            <span className={`font-medium ${seatsLeft <= 5 ? 'text-red-500' : 'text-green-500'}`}>
              {seatsLeft} من {course.capacity}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendar className="text-primary" />
            <span className="text-text-muted">تاريخ البداية:</span>
            <span className="font-medium">{formatDate(course.start_date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendar className="text-primary" />
            <span className="text-text-muted">تاريخ النهاية:</span>
            <span className="font-medium">{formatDate(course.end_date)}</span>
          </div>
        </div>
      </div>

      {/* Price Highlight */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {course.price} ج.م
          </div>
          <p className="text-text-muted text-sm">
            رسوم الدورة كاملة
          </p>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 mt-0.5">ℹ️</div>
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">مهم:</p>
            <p>
              هذا طلب تسجيل أولي. يرجى زيارة الأكاديمية خلال 48 ساعة لاستكمال إجراءات الدفع وتأكيد التسجيل.
            </p>
          </div>
        </div>
      </div>

      {/* Seats Warning */}
      {seatsLeft <= 5 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 mt-0.5">⚠️</div>
            <div className="text-sm text-red-800">
              <p className="font-medium mb-1">تنبيه:</p>
              <p>
                {seatsLeft === 0 
                  ? "الدورة مكتملة العدد. سيتم وضعك في قائمة الانتظار."
                  : `عدد الأماكن محدود - متبقي ${seatsLeft} مقاعد فقط!`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollModalBody;