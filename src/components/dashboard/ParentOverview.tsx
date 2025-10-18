import React from "react";
import { Parent, DashboardStats } from "@/types";
import StatCard from "@/components/dashboard/Shared/StatCard";
import { FiUsers, FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";

interface ParentOverviewProps {
  parent: Parent;
  stats: DashboardStats;
  childrenCount: number;
}

const ParentOverview: React.FC<ParentOverviewProps> = ({
  parent,
  stats,
  childrenCount,
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
                  {parent.user?.first_name?.[0]}
                  {parent.user?.last_name?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  أهلاً وسهلاً {parent.user?.first_name}{" "}
                  {parent.user?.last_name}
                </h1>
                <p className="text-emerald-100">
                  ولي أمر لـ {childrenCount}{" "}
                  {childrenCount === 1 ? "طفل" : "أطفال"}
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

          {/* Parent Contact Info */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-emerald-200">رقم الهاتف</p>
                <p className="font-medium">{parent.user?.phone_number1}</p>
              </div>
              {parent.user?.email && (
                <div>
                  <p className="text-emerald-200">البريد الإلكتروني</p>
                  <p className="font-medium">{parent.user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="الدورات النشطة"
          value={stats.activeCourses}
          icon={<FiCheckCircle className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="إجمالي المدفوعات"
          value={`${(stats.totalPayments || 0).toLocaleString()} ج.م`}
          icon={<FiDollarSign className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="طلبات التسجيل"
          value={stats.pendingEnrollments || 0}
          icon={<FiClock className="w-6 h-6" />}
          variant="islamic"
        />

        <StatCard
          title="عدد الأطفال"
          value={childrenCount}
          icon={<FiUsers className="w-6 h-6" />}
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
            <FiUsers className="w-5 h-5 mb-1" />
            <span className="text-sm">إدارة الأطفال</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <FiCheckCircle className="w-5 h-5 mb-1" />
            <span className="text-sm">تسجيل دورة جديدة</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <FiDollarSign className="w-5 h-5 mb-1" />
            <span className="text-sm">سجل المدفوعات</span>
          </button>

          <button className="inline-flex items-center justify-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            <FiClock className="w-5 h-5 mb-1" />
            <span className="text-sm">طلبات التسجيل</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentOverview;
