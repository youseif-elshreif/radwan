"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import StudentOverview from "@/components/dashboard/StudentOverview";
import StudentCoursesList from "@/components/dashboard/StudentCoursesList";
import StudentProgressCard from "@/components/dashboard/StudentProgressCard";
import { StudentDashboardData, Notification } from "@/types";
import { getStudentDashboard } from "@/services/api";
import { FiBell, FiX } from "react-icons/fi";
import Card from "@/components/ui/Card";

const StudentDashboardPage: React.FC = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] =
    useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Check if user is logged in and has correct role
        const storedUser = localStorage.getItem("user");
        const userRole = localStorage.getItem("userRole");

        if (!storedUser || userRole !== "student") {
          router.push("/login");
          return;
        }

        // Get student ID (mock for now)
        const studentId = "s1"; // In real app, get from user data

        const data = await getStudentDashboard(studentId);
        setDashboardData(data);
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const dismissNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">حدث خطأ في تحميل البيانات</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20 pb-12">
        <Container>
          <div className="space-y-8">
            {/* Notifications */}
            {notifications.length > 0 && (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="flex-shrink-0">
                          <FiBell className="w-5 h-5 text-blue-500 mt-0.5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Student Overview */}
            <StudentOverview
              student={dashboardData.student}
              stats={dashboardData.stats}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses List */}
              <div className="lg:col-span-2">
                <StudentCoursesList
                  enrollments={dashboardData.enrollments}
                  upcomingLectures={dashboardData.upcomingLectures}
                />
              </div>

              {/* Progress Card */}
              <div className="lg:col-span-1">
                <StudentProgressCard
                  examResults={dashboardData.examResults}
                  attendances={dashboardData.attendances}
                  enrollments={dashboardData.enrollments}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
