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
    <section className="relative py-16 bg-background overflow-hidden">
      {/* Islamic geometric pattern background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><pattern id="islamic" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><g fill="none" stroke="%23e47a2e" stroke-width="0.5"><path d="M20 0l20 20-20 20L0 20 20 0z"/><circle cx="20" cy="20" r="8" stroke-opacity="0.3"/><path d="M0 0l40 40M40 0L0 40" stroke-opacity="0.2"/></g></pattern></defs><rect width="200" height="200" fill="url(%23islamic)"/></svg>\')',
          backgroundSize: "200px 200px",
        }}
      />

      {/* Corner accent decorations */}
      <div className="absolute top-8 right-8 w-16 h-16 border-4 border-accent/20 rotate-45 rounded-sm"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-4 border-accent/30 rotate-45 rounded-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
