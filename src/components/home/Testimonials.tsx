"use client";

import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Testimonial } from "@/types";
import { testimonialsApi } from "@/api/testimonials";
import SectionHeader from "../ui/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsApi.getTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        // Use fallback data if API fails
        setTestimonials([
          {
            id: "1",
            name: "أحمد محمد",
            role: "طالب",
            rating: 5,
            quote:
              "تجربة رائعة! تعلمت الكثير من خلال كورس البرمجة والمدرسين محترفين جداً. أنصح الجميع بهذه الأكاديمية.",
          },
          {
            id: "2",
            name: "فاطمة علي",
            role: "ولي أمر",
            rating: 5,
            quote:
              "ابنتي استفادت كثيراً من كورس البرمجة. أصبحت تحب التكنولوجيا أكثر وتطور مهاراتها باستمرار.",
          },
          {
            id: "3",
            name: "محمد حسام",
            role: "طالب",
            rating: 4,
            quote:
              "كورس القرآن الكريم ممتاز وساعدني كثيراً في تحسين تلاوتي وحفظ سور جديدة.",
          },
          {
            id: "4",
            name: "أم يوسف",
            role: "ولي أمر",
            rating: 5,
            quote:
              "أولادي يحبون الدروس هنا والمدرسين صبورين ومتفهمين لاحتياجات الأطفال.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="w-5 h-5 text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="w-5 h-5 text-gray-300" />
      )
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary font-arabic mb-12 text-center">
            آراء الطلاب وأولياء الأمور
          </h2>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="min-w-80 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded mb-1 w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary font-arabic mb-12 text-center">
            آراء الطلاب وأولياء الأمور
          </h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-text-secondary font-arabic text-lg">
              لا توجد تقييمات متاحة حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 bg-surface overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g fill="%23e47a2e"><circle cx="30" cy="30" r="1.5" opacity="0.4"/><circle cx="10" cy="10" r="1" opacity="0.3"/><circle cx="50" cy="10" r="1" opacity="0.3"/><circle cx="10" cy="50" r="1" opacity="0.3"/><circle cx="50" cy="50" r="1" opacity="0.3"/></g></svg>\')',
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle accent borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="آراء الطلاب وأولياء الأمور"
          subtitle="شاهد ما يقوله طلابنا وأولياء أمورهم عن تجربتهم معنا"
          accent={true}
        />

        <div className="relative">
          {/* Swiper Container */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id || index}>
                <Card className="h-full">
                  {/* Quote */}
                  <div className="mb-6">
                    <div className="text-4xl text-primary mb-2">&ldquo;</div>
                    <p className="text-text-primary font-arabic text-right leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-start mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-text-primary font-arabic">
                        {testimonial.name}
                      </div>
                      {testimonial.role && (
                        <div className="text-sm text-text-secondary font-arabic">
                          {testimonial.role}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
