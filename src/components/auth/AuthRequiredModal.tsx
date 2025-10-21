import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaUser, FaUserPlus, FaTimes, FaLightbulb } from "react-icons/fa";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  courseName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FaUser className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-text">
              تسجيل الدخول مطلوب
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaUser className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">
              للتسجيل في الدورة
            </h3>
            <p className="text-text-muted leading-relaxed">
              يجب تسجيل الدخول أولاً للتسجيل في دورة
              <span className="font-medium text-text">
                {" "}
                &ldquo;{courseName}&rdquo;
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/login" className="block">
              <Button size="lg" className="w-full">
                <FaUser className="ml-2" />
                تسجيل الدخول
              </Button>
            </Link>

            <Link href="/register" className="block">
              <Button variant="outline" size="lg" className="w-full">
                <FaUserPlus className="ml-2" />
                إنشاء حساب جديد
              </Button>
            </Link>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm text-center flex items-center justify-center gap-2">
              <FaLightbulb className="text-blue-600" />
              إنشاء الحساب مجاني ويستغرق أقل من دقيقة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
