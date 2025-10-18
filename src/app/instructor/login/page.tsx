"use client";

import React from "react";
import Container from "@/components/common/Container";
import FormWrapper from "@/components/common/FormWrapper";
import LoginForm from "@/components/auth/LoginForm";

const InstructorLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5">
      <main className="pb-12">
        <Container size="sm" className="py-12">
          <FormWrapper
            title="تسجيل دخول المعلمين"
            subtitle="مرحباً بكم في منصة إدارة التعليم"
          >
            <LoginForm
              role="instructor"
              heading=""
              showSocialLogin={false}
              redirectTo="/dashboard/instructor"
            />
          </FormWrapper>
        </Container>
      </main>
    </div>
  );
};

export default InstructorLoginPage;
