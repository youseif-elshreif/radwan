"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import FormWrapper from "@/components/common/FormWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LoginFormData } from "@/types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual login logic
      console.log("Login data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to dashboard or previous page
      // router.push('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5">
      <main className=" pb-12">
        <Container size="sm" className="py-12">
          <FormWrapper
            title="تسجيل الدخول"
            subtitle="مرحباً بك مرة أخرى في أكاديمية الرضوان"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  placeholder="ادخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={errors.email}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="ادخل كلمة المرور"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    error={errors.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange("rememberMe")}
                    className="ml-2 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  تذكرني
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:text-accent transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full"
              >
                تسجيل الدخول
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">أو</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-2"
                >
                  <FaGoogle className="text-red-500" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  className="flex items-center justify-center gap-2"
                >
                  <FaFacebook className="text-blue-600" />
                  Facebook
                </Button>
              </div>

              {/* Register Link */}
              <div className="text-center text-sm">
                <span className="text-gray-600">ليس لديك حساب؟ </span>
                <Link
                  href="/register"
                  className="text-primary hover:text-accent font-medium transition-colors"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            </form>
          </FormWrapper>
        </Container>
      </main>
    </div>
  );
};

export default LoginPage;
