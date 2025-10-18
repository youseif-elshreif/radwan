import React from "react";
import { Course, Lecture } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  FiClock,
  FiUsers,
  FiCalendar,
  FiBarChart,
  FiBookOpen,
} from "react-icons/fi";

interface InstructorCoursesListProps {
  courses: Course[];
  lectures: Lecture[];
}

const InstructorCoursesList: React.FC<InstructorCoursesListProps> = ({
  courses,
  lectures,
}) => {
  const getUpcomingLecture = (courseId: string) => {
    return lectures
      .filter(
        (lecture) =>
          lecture.course_id === courseId && lecture.status === "scheduled"
      )
      .sort(
        (a, b) =>
          new Date(a.scheduled_at).getTime() -
          new Date(b.scheduled_at).getTime()
      )[0];
  };

  const getCourseLectureStats = (courseId: string) => {
    const courseLectures = lectures.filter((l) => l.course_id === courseId);
    const completed = courseLectures.filter(
      (l) => l.status === "completed"
    ).length;
    const total = courseLectures.length;
    return { completed, total };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">دوراتي</h2>
        <Badge variant="success">
          {courses.filter((c) => c.is_active).length} دورة نشطة
        </Badge>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => {
          const upcomingLecture = getUpcomingLecture(course.id);
          const lectureStats = getCourseLectureStats(course.id);
          const progress =
            lectureStats.total > 0
              ? (lectureStats.completed / lectureStats.total) * 100
              : 0;

          return (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-6 space-x-reverse">
                {/* Course Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={course.thumbnail || "/default-course.jpg"}
                    alt={course.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <Badge variant={course.is_active ? "success" : "default"}>
                      {course.is_active ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <FiUsers className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm text-blue-600 font-medium">
                        الطلاب
                      </p>
                      <p className="text-lg font-bold text-blue-900">
                        {course.enrolled_count} / {course.capacity}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-sm text-green-600 font-medium">
                        المحاضرات
                      </p>
                      <p className="text-lg font-bold text-green-900">
                        {lectureStats.completed} / {course.num_lectures}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <FiBarChart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm text-purple-600 font-medium">
                        التقدم
                      </p>
                      <p className="text-lg font-bold text-purple-900">
                        {Math.round(progress)}%
                      </p>
                    </div>

                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <FiClock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-sm text-amber-600 font-medium">
                        السعر
                      </p>
                      <p className="text-lg font-bold text-amber-900">
                        {course.price} ج.م
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">تقدم المنهج</span>
                      <span className="font-medium text-gray-900">
                        {Math.round(progress)}%
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
                      <div className="flex items-center justify-between">
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
                        <Badge variant="primary">
                          محاضرة رقم {upcomingLecture.lecture_number}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Button size="sm" variant="primary">
                      <FiCalendar className="w-4 h-4 ml-1" />
                      تسجيل الحضور
                    </Button>
                    <Button size="sm" variant="outline">
                      <FiBarChart className="w-4 h-4 ml-1" />
                      إنشاء امتحان
                    </Button>
                    <Button size="sm" variant="outline">
                      <FiUsers className="w-4 h-4 ml-1" />
                      إدارة الطلاب
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {courses.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد دورات مُكلف بها
            </h3>
            <p className="text-gray-500 mb-4">
              تواصل مع الإدارة لتكليفك بدورات جديدة
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstructorCoursesList;
