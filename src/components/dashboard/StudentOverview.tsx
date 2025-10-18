import React from "react";
import { StudentUser, DashboardStats } from "@/types";
import StatCard from "@/components/dashboard/Shared/StatCard";
import { FiBookOpen, FiCalendar, FiStar, FiTrendingUp } from "react-icons/fi";

interface StudentOverviewProps {
  student: StudentUser;
  stats: DashboardStats;
}

const StudentOverview: React.FC<StudentOverviewProps> = ({
  student,
  stats,
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='10,0 20,10 10,20 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {student.user?.first_name?.[0]}
                {student.user?.last_name?.[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                مرحباً {student.user?.first_name} {student.user?.last_name}
              </h1>
              <p className="text-emerald-100">
                رقم الطالب: {student.unique_code}
              </p>
            </div>
          </div>

          <div className="text-left">
            <p className="text-emerald-100 text-sm">اليوم</p>
            <p className="text-xl font-semibold">
              {new Date().toLocaleDateString("ar-SA", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="الدورات النشطة"
          value={stats.activeCourses}
          icon={<FiBookOpen className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="مجموع الحضور"
          value={stats.totalAttendances}
          icon={<FiCalendar className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="متوسط الدرجات"
          value={`${Math.round(stats.averageRating)}%`}
          icon={<FiStar className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="نسبة الإكمال"
          value={`${Math.round(stats.completionPercentage || 0)}%`}
          icon={<FiTrendingUp className="w-6 h-6" />}
          variant="islamic"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          إجراءات سريعة
        </h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="#courses"
            className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <FiBookOpen className="w-4 h-4 ml-2" />
            عرض دوراتي
          </a>
          <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <FiCalendar className="w-4 h-4 ml-2" />
            الجدول الزمني
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <FiStar className="w-4 h-4 ml-2" />
            تقييم المدرسين
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
