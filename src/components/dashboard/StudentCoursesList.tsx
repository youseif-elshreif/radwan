import React from "react";
import { Enrollment, Lecture } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { FiClock, FiUser, FiStar, FiPlay, FiBookOpen } from "react-icons/fi";

interface StudentCoursesListProps {
  enrollments: Enrollment[];
  upcomingLectures: Lecture[];
}

const StudentCoursesList: React.FC<StudentCoursesListProps> = ({
  enrollments,
  upcomingLectures,
}) => {
  const getUpcomingLecture = (courseId: string) => {
    return upcomingLectures.find((lecture) => lecture.course_id === courseId);
  };

  const calculateProgress = (enrollment: Enrollment) => {
    // Mock progress calculation based on enrollment date
    const startDate = new Date(enrollment.course?.start_date || "");
    const endDate = new Date(enrollment.course?.end_date || "");
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = currentDate.getTime() - startDate.getTime();

    const progress = Math.max(
      0,
      Math.min(100, (elapsed / totalDuration) * 100)
    );
    return Math.round(progress);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">دوراتي</h2>
        <Badge variant="success">
          {enrollments.filter((e) => e.active).length} دورة نشطة
        </Badge>
      </div>

      <div className="grid gap-6">
        {enrollments.map((enrollment) => {
          const course = enrollment.course;
          const progress = calculateProgress(enrollment);
          const upcomingLecture = getUpcomingLecture(enrollment.course_id);

          return (
            <Card
              key={enrollment.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4 space-x-reverse">
                {/* Course Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={course?.thumbnail || "/default-course.jpg"}
                    alt={course?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course?.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course?.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        variant={enrollment.active ? "success" : "default"}
                      >
                        {enrollment.status === "active"
                          ? "نشط"
                          : enrollment.status === "completed"
                          ? "مكتمل"
                          : enrollment.status === "dropped"
                          ? "منسحب"
                          : "معلق"}
                      </Badge>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 ml-1" />
                      <span>
                        المدرس: {course?.instructor?.user?.first_name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 ml-1" />
                      <span>{course?.num_lectures} محاضرة</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">التقدم</span>
                      <span className="font-medium text-gray-900">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Upcoming Lecture */}
                  {upcomingLecture && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center text-blue-800">
                        <FiClock className="w-4 h-4 ml-2" />
                        <span className="text-sm font-medium">
                          المحاضرة القادمة:{" "}
                          {new Date(
                            upcomingLecture.scheduled_at
                          ).toLocaleDateString("ar-SA")}{" "}
                          {new Date(
                            upcomingLecture.scheduled_at
                          ).toLocaleTimeString("ar-SA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Button size="sm" variant="primary">
                      <FiPlay className="w-4 h-4 ml-1" />
                      دخول الدورة
                    </Button>
                    <Button size="sm" variant="outline">
                      <FiStar className="w-4 h-4 ml-1" />
                      تقييم المدرس
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {enrollments.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد دورات مسجلة
            </h3>
            <p className="text-gray-500 mb-4">
              ابدأ رحلتك التعليمية بالتسجيل في إحدى دوراتنا
            </p>
            <Button variant="primary">تصفح الدورات المتاحة</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesList;
