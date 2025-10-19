"use client";

import React, { useState } from "react";
import Link from "next/link";

import Container from "@/components/common/Container";
import FormWrapper from "@/components/common/FormWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { RegisterFormData } from "@/types/auth.types";
import { FiEye, FiEyeOff, FiUser, FiUsers } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    numOfPartsofQuran: 0,
    age: 0,
    country: "مصر",
    quranLevel: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (field: keyof RegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement;
      let value: string | number | boolean = target.value;

      if (target.type === "checkbox") {
        value = target.checked;
      } else if (field === "numOfPartsofQuran" || field === "age") {
        value = parseInt(target.value) || 0;
      }

      setFormData((prev: RegisterFormData) => ({
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

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (formData.age < 1 || formData.age > 100) {
      newErrors.age = "العمر يجب أن يكون بين 1 و 100";
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
      // TODO: Implement actual registration logic
      console.log("Registration data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to verification or dashboard
      // router.push('/verify-email');
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // TODO: Implement social login
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5">
      <main className=" pb-12">
        <Container size="sm" className="py-12">
          <FormWrapper
            title="إنشاء حساب جديد"
            subtitle="انضم إلى عائلة أكاديمية الرضوان وابدأ رحلتك التعليمية"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <Input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  error={errors.name}
                  required
                />
              </div>

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

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <Input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  error={errors.phone}
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  نوع الحساب
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.role === "student"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleInputChange("role")}
                      className="sr-only"
                    />
                    <FiUser className="ml-3 text-xl" />
                    <div className="text-center">
                      <div className="font-medium">طالب</div>
                      <div className="text-sm text-gray-500">
                        للتسجيل في الدورات
                      </div>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.role === "parent"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="parent"
                      checked={formData.role === "parent"}
                      onChange={handleInputChange("role")}
                      className="sr-only"
                    />
                    <FiUsers className="ml-3 text-xl" />
                    <div className="text-center">
                      <div className="font-medium">ولي أمر</div>
                      <div className="text-sm text-gray-500">
                        لتسجيل الأطفال
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="كلمة المرور"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="تأكيد كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      error={errors.confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full"
              >
                إنشاء حساب
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

              {/* Login Link */}
              <div className="text-center text-sm">
                <span className="text-gray-600">لديك حساب بالفعل؟ </span>
                <Link
                  href="/login"
                  className="text-primary hover:text-accent font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </form>
          </FormWrapper>
        </Container>
      </main>
    </div>
  );
};

export default RegisterPage;
