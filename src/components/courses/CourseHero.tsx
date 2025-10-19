import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CourseWithDetails } from "@/types/course";

interface CourseHeroProps {
  course: CourseWithDetails;
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Course Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={course.thumbnail}
                alt={course.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {course.featured && (
              <div className="absolute -top-4 -right-4">
                <Badge variant="accent" className="text-sm px-4 py-2">
                  ⭐ مميز
                </Badge>
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="primary" className="mb-4">
                {course.category || course.tags?.[0]}
              </Badge>
              <h1 className="text-4xl font-bold text-text mb-4 leading-tight">
                {course.name}
              </h1>
              <p className="text-text-muted text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <span className="text-primary">👨‍🏫</span>
                <span>{course.instructor_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">⏱️</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📚</span>
                <span>{course.num_lectures} محاضرة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">👥</span>
                <span>{course.enrolled_count} طالب</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="bg-surface rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary">
                    {course.price} ج.م
                  </span>
                  <span className="text-text-muted mr-2">للدورة كاملة</span>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{course.rating}</span>
                  </div>
                )}
              </div>
              <Button size="lg" className="w-full">
                احجز مكانك الآن
              </Button>
              <p className="text-center text-sm text-text-muted mt-3">
                {course.capacity - course.enrolled_count} مقعد متبقي فقط
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;