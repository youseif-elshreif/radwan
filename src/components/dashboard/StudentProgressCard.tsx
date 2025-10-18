import React from "react";
import Card from "@/components/ui/Card";
import { ExamResult, LectureAttendance, Enrollment } from "@/types";
import { FiTarget, FiTrendingUp, FiCalendar, FiAward } from "react-icons/fi";

interface StudentProgressCardProps {
  examResults: ExamResult[];
  attendances: LectureAttendance[];
  enrollments: Enrollment[];
}

const StudentProgressCard: React.FC<StudentProgressCardProps> = ({
  examResults,
  attendances,
  enrollments,
}) => {
  // Calculate overall completion percentage
  const calculateOverallProgress = () => {
    if (enrollments.length === 0) return 0;

    const activeEnrollments = enrollments.filter((e) => e.active);
    if (activeEnrollments.length === 0) return 0;

    // Mock calculation based on time elapsed
    const now = new Date();
    let totalProgress = 0;

    activeEnrollments.forEach((enrollment) => {
      const startDate = new Date(enrollment.course?.start_date || "");
      const endDate = new Date(enrollment.course?.end_date || "");

      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();

      const progress = Math.max(
        0,
        Math.min(100, (elapsed / totalDuration) * 100)
      );
      totalProgress += progress;
    });

    return Math.round(totalProgress / activeEnrollments.length);
  };

  // Calculate attendance rate
  const calculateAttendanceRate = () => {
    if (attendances.length === 0) return 0;
    const presentCount = attendances.filter((a) => a.present).length;
    return Math.round((presentCount / attendances.length) * 100);
  };

  // Calculate average grade
  const calculateAverageGrade = () => {
    if (examResults.length === 0) return 0;
    const totalPercentage = examResults.reduce(
      (sum, result) => sum + result.percentage,
      0
    );
    return Math.round(totalPercentage / examResults.length);
  };

  const overallProgress = calculateOverallProgress();
  const attendanceRate = calculateAttendanceRate();
  const averageGrade = calculateAverageGrade();

  // Get latest exam results
  const latestExams = examResults
    .sort(
      (a, b) =>
        new Date(b.entered_at || "").getTime() -
        new Date(a.entered_at || "").getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            التقدم الإجمالي هذا الفصل
          </h3>
          <div className="relative inline-flex items-center justify-center">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${overallProgress * 2.51} 251`}
                className="text-emerald-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600">
                {overallProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiCalendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">معدل الحضور</p>
            <p className="text-lg font-semibold text-gray-900">
              {attendanceRate}%
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiAward className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">متوسط الدرجات</p>
            <p className="text-lg font-semibold text-gray-900">
              {averageGrade}%
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiTarget className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">الدورات النشطة</p>
            <p className="text-lg font-semibold text-gray-900">
              {enrollments.filter((e) => e.active).length}
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Exam Results */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            آخر نتائج الامتحانات
          </h3>
          <FiTrendingUp className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="space-y-3">
          {latestExams.length > 0 ? (
            latestExams.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {result.exam?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(result.entered_at || "").toLocaleDateString(
                      "ar-SA"
                    )}
                  </p>
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-gray-900">
                      {result.marks_obtained}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {result.exam?.total_marks}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      result.percentage >= 90
                        ? "text-green-600"
                        : result.percentage >= 75
                        ? "text-blue-600"
                        : result.percentage >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.percentage}%
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiAward className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500">لا توجد نتائج امتحانات حتى الآن</p>
            </div>
          )}
        </div>

        {latestExams.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
              عرض جميع النتائج ←
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentProgressCard;
