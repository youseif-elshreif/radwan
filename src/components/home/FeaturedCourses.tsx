"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/types";
import { getFeaturedCourses } from "@/utils/api";
import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";

const FeaturedCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedCourses = async () => {
      try {
        setLoading(true);
        const featuredCourses = await getFeaturedCourses();
        setCourses(featuredCourses);
      } catch (err) {
        console.error("Error loading featured courses:", err);
        setError("فشل في تحميل الكورسات المميزة");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedCourses();
  }, []);

  const handleEnroll = (courseId: string) => {
    // Placeholder for enrollment logic
    console.log("Enrolling in course:", courseId);
    // In a real app, this would open a registration modal or redirect to enrollment page
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary font-arabic mb-8 text-center">
            الكورسات المميزة
          </h2>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary font-arabic mb-8 text-center">
            الكورسات المميزة
          </h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-error font-arabic text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-primary font-arabic hover:underline"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary font-arabic mb-8 text-center">
            الكورسات المميزة
          </h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-text-secondary font-arabic text-lg">
              لا توجد كورسات مميزة متاحة حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="الكورسات المميزة"
          subtitle="اكتشف أفضل الكورسات التعليمية المصممة خصيصاً لتطوير مهارات الأطفال والشباب"
          accent={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
            />
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" className="min-w-56">
            عرض جميع الكورسات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
