"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import FilterBar, { ExtendedFilters } from "@/components/common/FilterBar";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { CourseEnrollmentManager, CourseList } from "@/components/enrollment";
import { Course, CourseFilters } from "@/types";
import { CourseWithDetails } from "@/types/course";
import { coursesApi } from "@/api/courses";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseWithDetails[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseWithDetails[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<ExtendedFilters>({});

  useEffect(() => {
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Convert Course to CourseWithDetails
  const convertToDetailsFormat = (course: Course): CourseWithDetails => {
    return {
      ...course,
      season_id: course.season_id || "default-season",
      instructor_id: course.instructor_id || "default-instructor",
      rating: 4.5, // Default rating
      reviews: [], // Default empty reviews array
      instructor_name: "أستاذ محمد", // Default instructor name
      duration: "3 أشهر", // Default duration
      category: course.tags?.[0] || "عام", // Use first tag as category
      enrolled_count: course.enrolled_count || 0,
      thumbnail: course.thumbnail || "",
      tags: course.tags || [],
      featured: course.featured || false,
      is_active: course.is_active !== false,
    };
  };

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [coursesData, categoriesData] = await Promise.all([
        coursesApi.getCourses(),
        coursesApi.getCategories(),
      ]);

      const coursesWithDetails = coursesData.map(convertToDetailsFormat);
      setCourses(coursesWithDetails);
      setFilteredCourses(coursesWithDetails);
      setCategories(categoriesData);
    } catch (err) {
      // setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
      setFilteredCourses([
        {
          id: "1",
          name: "تحفيظ القرآن الكريم",
          description:
            "كورس شامل لتعلم تلاوة وحفظ القرآن الكريم مع أحكام التجويد الأساسية",
          season_id: "winter-2024",
          start_date: "2024-01-15",
          end_date: "2024-06-15",
          num_lectures: 30,
          capacity: 25,
          price: 250,
          instructor_id: "1",
          tags: ["قرآن", "تجويد", "حفظ"],
          featured: true,
          is_active: true,
          enrolled_count: 85,
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          instructor_name: "أستاذ محمد أحمد",
          rating: 4.9,
          reviews: [],
          duration: "5 أشهر",
          category: "قرآن",
        },
        {
          id: "2",
          name: "البرمجة للمبتدئين",
          description:
            "تعلم أساسيات البرمجة من الصفر باستخدام لغة Python بطريقة مبسطة وممتعة",
          season_id: "winter-2024",
          start_date: "2024-02-01",
          end_date: "2024-05-01",
          num_lectures: 24,
          capacity: 30,
          price: 300,
          instructor_id: "2",
          tags: ["برمجة", "Python", "مبتدئين"],
          featured: true,
          is_active: true,
          enrolled_count: 92,
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          instructor_name: "م. سارة محمد",
          rating: 4.7,
          reviews: [],
          duration: "3 أشهر",
          category: "برمجة",
        },
        {
          id: "3",
          name: "الرياضيات المتقدمة",
          description:
            "كورس شامل في الرياضيات للمرحلة الثانوية وإعداد الطلاب للجامعة",
          season_id: "spring-2024",
          start_date: "2024-03-01",
          end_date: "2024-08-01",
          num_lectures: 40,
          capacity: 20,
          price: 400,
          instructor_id: "3",
          tags: ["رياضيات", "ثانوية", "جامعة"],
          featured: true,
          is_active: true,
          enrolled_count: 67,
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          instructor_name: "د. أحمد عبدالرحمن",
          rating: 4.8,
          reviews: [],
          duration: "5 أشهر",
          category: "رياضيات",
        },
        {
          id: "4",
          name: "تصميم الجرافيك للمبتدئين",
          description:
            "تعلم أساسيات تصميم الجرافيك باستخدام أدوات مثل Photoshop وIllustrator",
          season_id: "spring-2024",
          start_date: "2024-04-01",
          end_date: "2024-09-01",
          num_lectures: 36,
          capacity: 20,
          price: 350,
          instructor_id: "4",
          tags: ["تصميم", "جرافيك", "مبتدئين"],
          featured: true,
          is_active: true,
          enrolled_count: 45,
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          instructor_name: "أ. نورا الشيخ",
          rating: 4.6,
          reviews: [],
          duration: "5 أشهر",
          category: "تصميم",
        },
      ]);
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyClientSideFilters = (
    courses: CourseWithDetails[],
    filters: ExtendedFilters
  ): CourseWithDetails[] => {
    let filtered = [...courses];

    // Apply price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter((course) => {
        const price = course.price || 0;
        const minCheck =
          filters.minPrice === undefined || price >= filters.minPrice;
        const maxCheck =
          filters.maxPrice === undefined || price <= filters.maxPrice;
        return minCheck && maxCheck;
      });
    }

    // Apply level filter (this would need to be added to Course interface)
    if (filters.level) {
      // For now, we'll simulate this - in real app, course would have a level field
      filtered = filtered.filter((course) =>
        course.tags?.some((tag) =>
          tag.toLowerCase().includes(filters.level?.toLowerCase() || "")
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "price_asc":
            return (a.price || 0) - (b.price || 0);
          case "price_desc":
            return (b.price || 0) - (a.price || 0);
          case "date_desc":
            return (
              new Date(b.start_date || 0).getTime() -
              new Date(a.start_date || 0).getTime()
            );
          case "date_asc":
            return (
              new Date(a.start_date || 0).getTime() -
              new Date(b.start_date || 0).getTime()
            );
          case "rating_desc":
            // Simulate rating based on enrolled_count for now
            return (b.enrolled_count || 0) - (a.enrolled_count || 0);
          default:
            return 0;
        }
      });
    }

    return filtered;
  };

  const handleFiltersChange = async (filters: ExtendedFilters) => {
    try {
      setCurrentFilters(filters);
      setIsLoading(true);

      // Get base filtered data from API (search, category)
      const baseFilters: CourseFilters = {};
      if (filters.search) baseFilters.search = filters.search;
      if (filters.category) baseFilters.category = filters.category;

      const apiFilteredData = await coursesApi.getCourses(baseFilters);
      const coursesWithDetails = apiFilteredData.map(convertToDetailsFormat);

      // Apply client-side filters (sorting, price range, level)
      const fullyFilteredData = applyClientSideFilters(
        coursesWithDetails,
        filters
      );

      setFilteredCourses(fullyFilteredData);
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
        <section
          className="relative min-h-[70vh] flex items-center text-white overflow-hidden"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/75"></div>

          {/* Islamic geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="none" stroke="%23ffffff" stroke-opacity="0.3"><circle cx="50" cy="50" r="40" stroke-width="1"/><path d="M50 10v80M10 50h80" stroke-width="0.5"/><circle cx="50" cy="50" r="25" stroke-width="0.5"/><circle cx="50" cy="50" r="15" stroke-width="0.5"/><path d="M30 30l40 40M70 30l-40 40" stroke-width="0.3"/></g></svg>')`,
              backgroundSize: "100px 100px",
            }}
          ></div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 right-10 w-16 h-16 border border-accent/30 rounded-full animate-float hidden lg:block"></div>
          <div className="absolute bottom-32 left-16 w-12 h-12 bg-accent/20 rounded-full animate-pulse-slow hidden lg:block"></div>
          <div className="absolute top-1/3 left-1/4 w-8 h-8 border border-white/20 rotate-45 animate-float hidden lg:block"></div>
          <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-white/10 rounded-full animate-pulse-slow hidden lg:block"></div>

          <Container className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  جميع{" "}
                  <span className="text-accent mx-3 relative">الدورات</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  اكتشف مجموعة واسعة من الدورات التعليمية في العلوم الشرعية
                  والتطبيقية
                  <br />
                  المصممة خصيصاً لتطوير مهاراتك ومعرفتك
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {courses.length}+
                  </div>
                  <div className="text-sm text-white/80">دورة متاحة</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {categories.length}+
                  </div>
                  <div className="text-sm text-white/80">تخصص مختلف</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-1">
                    500+
                  </div>
                  <div className="text-sm text-white/80">طالب نشط</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-1">50+</div>
                  <div className="text-sm text-white/80">مدرس خبير</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Courses Content */}
        <section
          className="py-20 relative"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="%23336154" stroke-opacity="0.06"><circle cx="40" cy="40" r="30" stroke-width="1"/><path d="M40 10v60M10 40h60" stroke-width="0.5"/><circle cx="40" cy="40" r="20" stroke-width="0.5"/><circle cx="40" cy="40" r="10" stroke-width="0.5"/></g></svg>')`,
            backgroundSize: "80px 80px",
          }}
        >
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

          <Container>
            {/* Section Header */}
            <div className="text-center">
              <div className="relative inline-block">
                <SectionHeader
                  title="اختر دورتك التعليمية"
                  subtitle="استعرض مجموعة متنوعة من الدورات"
                  accent={true}
                />
              </div>
            </div>

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
                  <div className="relative">
                    {/* Decorative corner elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent/20 rounded-full animate-float hidden lg:block"></div>
                    <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/5 rounded-full animate-pulse-slow hidden lg:block"></div>

                    <CourseEnrollmentManager>
                      <CourseList
                        courses={filteredCourses as CourseWithDetails[]}
                      />
                    </CourseEnrollmentManager>
                  </div>
                ) : (
                  <div className="relative text-center py-20">
                    {/* Islamic geometric background for empty state */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g fill="none" stroke="%23336154" stroke-opacity="0.3"><circle cx="60" cy="60" r="50" stroke-width="2"/><path d="M60 10v100M10 60h100" stroke-width="1"/><circle cx="60" cy="60" r="35" stroke-width="1"/><circle cx="60" cy="60" r="20" stroke-width="1"/><path d="M35 35l50 50M85 35l-50 50" stroke-width="0.5"/></g></svg>')`,
                        backgroundSize: "120px 120px",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    <div className="relative z-10">
                      <div className="relative mx-auto mb-8 w-32 h-32">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center animate-pulse-slow">
                          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-primary/60"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Floating decorative elements */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 border border-accent/30 rounded-full animate-float"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse-slow"></div>
                      </div>

                      <h3 className="text-2xl font-bold text-primary mb-3">
                        لا توجد دورات متاحة
                      </h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary mx-auto mb-4"></div>
                      <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                        {Object.keys(currentFilters).length > 0
                          ? "لم يتم العثور على دورات تطابق الفلاتر المحددة. جرب تغيير معايير البحث"
                          : "لا توجد دورات متاحة حالياً. نعمل على إضافة المزيد من الدورات قريباً"}
                      </p>

                      {Object.keys(currentFilters).length > 0 && (
                        <Button
                          onClick={() => handleFiltersChange({})}
                          variant="outline"
                          className="bg-white border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          عرض جميع الدورات
                        </Button>
                      )}
                    </div>
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
