"use client";

import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/utils/api";
import SectionHeader from "../ui/SectionHeader";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
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

  const visibleTestimonials =
    testimonials.length >= 3
      ? [
          testimonials[currentIndex],
          testimonials[(currentIndex + 1) % testimonials.length],
          testimonials[(currentIndex + 2) % testimonials.length],
        ]
      : testimonials;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="آراء الطلاب وأولياء الأمور"
          subtitle="شاهد ما يقوله طلابنا وأولياء أمورهم عن تجربتهم معنا"
          accent={true}
        />

        <div className="relative">
          {/* Testimonials Container */}
          <div className="flex gap-6 overflow-hidden">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={`${currentIndex}-${index}`}
                className="min-w-80 flex-1"
              >
                {/* Quote */}
                <div className="mb-6">
                  <div className="text-4xl text-primary mb-2">&ldquo;</div>
                  <p className="text-text-primary font-arabic text-right leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-end mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 justify-end">
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
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Dots */}
          {testimonials.length > 3 && (
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
