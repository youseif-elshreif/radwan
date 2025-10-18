import React from "react";
import { Instructor, DashboardStats } from "@/types";
import StatCard from "@/components/dashboard/Shared/StatCard";
import {
  FiBookOpen,
  FiUsers,
  FiStar,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

interface InstructorOverviewProps {
  instructor: Instructor;
  stats: DashboardStats;
}

const InstructorOverview: React.FC<InstructorOverviewProps> = ({
  instructor,
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

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {instructor.user?.first_name?.[0]}
                  {instructor.user?.last_name?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  أ. {instructor.user?.first_name} {instructor.user?.last_name}
                </h1>
                <p className="text-emerald-100">
                  معلم منذ {new Date(instructor.hire_date || "").getFullYear()}
                </p>
              </div>
            </div>

            <div className="text-left">
              <p className="text-emerald-100 text-sm">التقييم</p>
              <div className="flex items-center">
                <FiStar className="w-5 h-5 text-yellow-300 ml-1" />
                <span className="text-xl font-semibold">
                  {instructor.avg_rating?.toFixed(1) || "0.0"}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-emerald-100 text-sm">
              {instructor.bio || "لا توجد معلومات إضافية"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="الدورات التي أدرسها"
          value={stats.activeCourses}
          icon={<FiBookOpen className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="عدد الطلاب"
          value={stats.studentsCount || 0}
          icon={<FiUsers className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="متوسط الحضور"
          value={`${stats.totalAttendances}%`}
          icon={<FiCalendar className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="الراتب الشهري"
          value={`${instructor.monthly_salary?.toLocaleString()} ج.م`}
          icon={<FiDollarSign className="w-6 h-6" />}
          variant="islamic"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          إجراءات سريعة
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="inline-flex items-center justify-center px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
            <FiCalendar className="w-5 h-5 mb-1" />
            <span className="text-sm">تسجيل الحضور</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <FiBookOpen className="w-5 h-5 mb-1" />
            <span className="text-sm">إنشاء امتحان</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <FiStar className="w-5 h-5 mb-1" />
            <span className="text-sm">إدخال الدرجات</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            <FiUsers className="w-5 h-5 mb-1" />
            <span className="text-sm">إدارة الطلاب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorOverview;
