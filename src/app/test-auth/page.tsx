"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

const TestAuthPage: React.FC = () => {
  const { user, isLoggedIn, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            اختبار نظام المصادقة
          </h1>

          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  مرحباً!
                </h2>
                <div className="text-green-700">
                  <p>
                    <strong>الاسم:</strong> {user?.first_name} {user?.last_name}
                  </p>
                  <p>
                    <strong>البريد الإلكتروني:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>الدور:</strong> {user?.role}
                  </p>
                  <p>
                    <strong>المعرف:</strong> {user?.id}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:border-red-600"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">
                  غير مسجل الدخول
                </h2>
                <p className="text-blue-700">
                  يرجى تسجيل الدخول لرؤية معلومات الحساب
                </p>
              </div>

              <div className="text-center">
                <a href="/login">
                  <Button variant="primary">تسجيل الدخول</Button>
                </a>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">معلومات الاختبار:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>API:</strong> /api/auth/login
              </p>
              <p>
                <strong>البريد الإلكتروني للاختبار:</strong> student@gmail.com
              </p>
              <p>
                <strong>كلمة المرور للاختبار:</strong> 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;
