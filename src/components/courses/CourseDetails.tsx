import Card from "@/components/ui/Card";
import { CourseWithDetails } from "@/types/course";

interface CourseDetailsProps {
  course: CourseWithDetails;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-text mb-6">تفاصيل الدورة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">المدة:</span>
            <span className="font-medium text-text">{course.duration}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">عدد المحاضرات:</span>
            <span className="font-medium text-text">
              {course.num_lectures} محاضرة
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">تاريخ البداية:</span>
            <span className="font-medium text-text">
              {formatDate(course.start_date)}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">تاريخ النهاية:</span>
            <span className="font-medium text-text">
              {formatDate(course.end_date)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">السعة القصوى:</span>
            <span className="font-medium text-text">
              {course.capacity} طالب
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">المسجلون حالياً:</span>
            <span className="font-medium text-text">
              {course.enrolled_count} طالب
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">المقاعد المتبقية:</span>
            <span className="font-medium text-primary">
              {course.capacity - course.enrolled_count} مقعد
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-text-muted">الفئة:</span>
            <span className="font-medium text-text">{course.category}</span>
          </div>
        </div>
      </div>

      {/* Course Tags */}
      {course.tags && course.tags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-text mb-3">الموضوعات:</h3>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CourseDetails;
