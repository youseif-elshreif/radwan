"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { coursesApi } from "@/api/courses";
import { Course as BaseCourse } from "@/types";
import { CourseWithDetails, Review } from "@/types/course";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseHero from "@/components/courses/CourseHero";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorCard from "@/components/courses/InstructorCard";
import ReviewCard from "@/components/courses/ReviewCard";
import CourseSkeleton from "@/components/courses/CourseSkeleton";
import { EnrollModal } from "@/components/modals";
import AuthRequiredModal from "@/components/auth/AuthRequiredModal";
import SuccessMessage from "@/components/ui/SuccessMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { FaExclamationTriangle, FaGraduationCap, FaStar } from "react-icons/fa";

const CourseDetailPage = () => {
  const params = useParams();
  const courseId = params.id as string;
  const { user, isLoggedIn } = useAuth();

  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enrollment modal states
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get student ID from auth context
  const studentId = user ? parseInt(user.id) : 1;

  // Transform course data to match display requirements
  const transformCourseData = (rawCourse: BaseCourse): CourseWithDetails => {
    // Calculate duration from start and end dates
    const startDate = new Date(rawCourse.start_date);
    const endDate = new Date(rawCourse.end_date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

    return {
      id: rawCourse.id,
      name: rawCourse.name,
      description: rawCourse.description,
      season_id: rawCourse.season_id || "",
      start_date: rawCourse.start_date,
      end_date: rawCourse.end_date,
      num_lectures: rawCourse.num_lectures,
      capacity: rawCourse.capacity,
      price: rawCourse.price,
      instructor_id: rawCourse.instructor_id || "",
      enrolled_count: rawCourse.enrolled_count || 0,
      is_active: rawCourse.is_active || true,
      thumbnail: rawCourse.thumbnail || "",
      tags: rawCourse.tags || [],
      featured: rawCourse.featured || false,

      instructor_name: `الأستاذ ${rawCourse.instructor_id}`, // يمكن تحسينها لاحقاً
      duration: `${diffWeeks} أسبوع`,
      category: rawCourse.tags?.[0] || "عام",
      // Add mock reviews
      reviews: [
        {
          student: "أحمد محمد",
          rating: 5,
          comment: "دورة ممتازة جداً، استفدت كثيراً من المحتوى والطريقة",
        },
        {
          student: "فاطمة علي",
          rating: 4,
          comment: "محتوى قيم ومفيد، أنصح الجميع بحضورها",
        },
      ],
      rating: 4.8,
    };
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const courseData = await coursesApi.getCourseById(courseId);
        const transformedCourse = transformCourseData(courseData);
        setCourse(transformedCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
        setCourse({
          id: "1",
          name: "دورة تجريبية",
          description: "وصف الدورة التجريبية",
          season_id: "1",
          start_date: "2024-01-01",
          end_date: "2024-04-01",
          num_lectures: 12,
          capacity: 30,
          price: 200,
          instructor_id: "1",
          tags: ["تجريبي"],
          featured: false,
          is_active: true,
          enrolled_count: 15,
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          instructor_name: "الأستاذ التجريبي",
          duration: "12 أسبوع",
          category: "تجريبي",
          reviews: [
            {
              student: "طالب تجريبي",
              rating: 5,
              comment: "هذه دورة تجريبية رائعة!",
            },
          ],
          rating: 5.0,
        });
        setError("حدث خطأ في تحميل بيانات الدورة");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews-section");
    reviewsSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Enrollment functions
  const handleEnrollClick = () => {
    if (!isLoggedIn) {
      setIsAuthRequiredModalOpen(true);
      return;
    }
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsEnrollModalOpen(false);
  };

  const handleEnrollError = (message: string) => {
    setErrorMessage(message);
    setIsEnrollModalOpen(false);
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
  };

  if (loading) {
    return <CourseSkeleton />;
  }

  if (error || !course) {
    return (
      <Container className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4 text-red-500">
            <FaExclamationTriangle className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-4">
            {error || "الدورة غير موجودة"}
          </h1>
          <p className="text-text-muted mb-6">
            عذراً، لا يمكننا العثور على الدورة المطلوبة
          </p>
          <Button onClick={() => window.history.back()}>العودة للخلف</Button>
        </div>
      </Container>
    );
  }

  const averageRating = course.rating || 0;
  const hasReviews = course.reviews && course.reviews.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <CourseHero course={course} onEnrollClick={handleEnrollClick} />

      {/* Main Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <section className="bg-surface rounded-xl p-8 shadow-sm border border-border">
              <SectionHeader
                title="نظرة عامة على الدورة"
                subtitle="تعرف على محتوى الدورة وما ستتعلمه"
                accent={true}
              />
              <div className="mt-6">
                <p className="text-text leading-relaxed text-lg">
                  {course.description}
                </p>

                {/* Course Highlights */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {course.num_lectures}
                    </div>
                    <div className="text-sm text-text-muted">
                      محاضرة تفاعلية
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {course.duration}
                    </div>
                    <div className="text-sm text-text-muted">مدة الدورة</div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {course.enrolled_count}
                    </div>
                    <div className="text-sm text-text-muted">طالب مسجل</div>
                  </div>
                </div>

                {hasReviews && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={scrollToReviews}
                      className="hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    >
                      <span>عرض التقييمات</span>
                      <FaStar className="text-yellow-500" />
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Reviews Section */}
            <section
              id="reviews-section"
              className="bg-surface rounded-xl p-8 shadow-sm border border-border"
            >
              <SectionHeader
                title="التقييمات والآراء"
                subtitle={`متوسط التقييم: ${averageRating.toFixed(1)} من 5`}
              />

              {hasReviews ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.reviews!.map((review: Review, index: number) => (
                    <div
                      key={index}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 text-center py-12 bg-primary/5 rounded-lg">
                  <div className="text-4xl mb-4 text-primary">
                    <FaGraduationCap className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-text mb-2">
                    لم يتم إضافة تقييمات بعد
                  </h3>
                  <p className="text-text-muted">
                    كن أول من يحجز ويشارك برأيه بعد حضور الدورة
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Course Details Card */}
            <CourseDetails course={course} />

            {/* Instructor Card */}
            <InstructorCard
              instructor_name={course.instructor_name}
              instructor_id={course.instructor_id}
            />

            {/* Sticky CTA */}
            <div className="sticky top-8 bg-surface rounded-xl p-6 shadow-sm border border-border">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  {course.price} ج.م
                </div>
                <div className="text-sm text-text-muted">
                  {course.capacity - course.enrolled_count} مقعد متبقي
                </div>
              </div>
              <Button
                size="lg"
                className="w-full hover:scale-105 transition-transform"
                onClick={handleEnrollClick}
              >
                احجز مكانك الآن
              </Button>
              <p className="text-xs text-text-muted text-center mt-3">
                ضمان استرداد خلال 7 أيام
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            جاهز لبدء رحلتك التعليمية؟
          </h2>
          <p className="text-xl mb-6 opacity-90">
            انضم إلى {course.enrolled_count} طالب آخرين في هذه الدورة المميزة
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="hover:scale-105 transition-transform"
            onClick={handleEnrollClick}
          >
            سجل الآن - {course.price} ج.م
          </Button>
        </div>
      </Container>

      {/* Enrollment Modal */}
      {course && (
        <EnrollModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          course={course}
          studentId={studentId}
          onSuccess={handleEnrollSuccess}
          onError={handleEnrollError}
        />
      )}

      {/* Auth Required Modal */}
      <AuthRequiredModal
        isOpen={isAuthRequiredModalOpen}
        onClose={() => setIsAuthRequiredModalOpen(false)}
        courseName={course?.name || "الدورة"}
      />

      {/* Success Message */}
      <SuccessMessage
        message={successMessage}
        isVisible={!!successMessage}
        onClose={handleCloseSuccessMessage}
      />

      {/* Error Message */}
      <ErrorMessage
        message={errorMessage}
        isVisible={!!errorMessage}
        onClose={handleCloseErrorMessage}
      />
    </div>
  );
};

export default CourseDetailPage;
