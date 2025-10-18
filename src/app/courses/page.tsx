"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import FilterBar from "@/components/common/FilterBar";
import CourseCard from "@/components/home/CourseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { Course, CourseFilters } from "@/types";
import { coursesApi } from "@/api/courses";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<CourseFilters>({});

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [coursesData, categoriesData] = await Promise.all([
        coursesApi.getCourses(),
        coursesApi.getCategories(),
      ]);

      setCourses(coursesData);
      setFilteredCourses(coursesData);
      setCategories(categoriesData);
    } catch (err) {
      setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = async (filters: CourseFilters) => {
    try {
      setCurrentFilters(filters);
      setIsLoading(true);

      const filteredData = await coursesApi.getCourses(filters);
      setFilteredCourses(filteredData);
    } catch (err) {
      setError("فشل في تطبيق الفلاتر. يرجى المحاولة مرة أخرى.");
      console.error("Error filtering courses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const retryLoad = () => {
    setError(null);
    loadInitialData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                جميع الدورات
              </h1>
              <p className="text-xl text-primary-50 leading-relaxed">
                اكتشف مجموعة واسعة من الدورات التعليمية في العلوم الشرعية
                والتطبيقية المصممة خصيصاً لتطوير مهاراتك ومعرفتك
              </p>
            </div>
          </Container>
        </section>

        {/* Courses Content */}
        <section className="py-16">
          <Container>
            {/* Section Header */}
            <SectionHeader
              title="استكشف دوراتنا"
              subtitle="اختر الدورة المناسبة لك من بين مجموعة متنوعة من التخصصات"
              accent={true}
              className="mb-12"
            />

            {/* Filter Bar */}
            <FilterBar
              onFiltersChange={handleFiltersChange}
              categories={categories}
              isLoading={isLoading}
            />

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
                <p className="text-red-700 mb-4">{error}</p>
                <Button onClick={retryLoad} variant="outline">
                  المحاولة مرة أخرى
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary mx-auto mb-4" />
                  <p className="text-gray-600">جاري تحميل الدورات...</p>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            {!isLoading && !error && (
              <>
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      لا توجد دورات متاحة
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {Object.keys(currentFilters).length > 0
                        ? "لم يتم العثور على دورات تطابق الفلاتر المحددة"
                        : "لا توجد دورات متاحة حالياً"}
                    </p>
                    {Object.keys(currentFilters).length > 0 && (
                      <Button
                        onClick={() => handleFiltersChange({})}
                        variant="outline"
                      >
                        عرض جميع الدورات
                      </Button>
                    )}
                  </div>
                )}

                {/* Results Summary */}
                {filteredCourses.length > 0 && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-600">
                      عرض {filteredCourses.length} من أصل {courses.length} دورة
                    </p>
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
