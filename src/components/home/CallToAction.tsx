import React from "react";
import Button from "../ui/Button";
import { FaArrowLeft, FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-l from-primary via-primary-100 to-primary overflow-hidden">
      {/* Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g fill="none" stroke="%23ffffff" stroke-opacity="0.3"><circle cx="60" cy="60" r="50" stroke-width="1"/><path d="M60 10v100M10 60h100" stroke-width="0.5"/><circle cx="60" cy="60" r="25" stroke-width="0.8"/></g></svg>\')',
          backgroundSize: "120px 120px",
        }}
      />

      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float [animation-delay:2s]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-right text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-arabic mb-6 leading-tight">
              ابدأ رحلة التعلم
              <span className="block text-accent">مع أطفالك اليوم</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/90 font-arabic mb-8 leading-relaxed max-w-2xl lg:mr-0 mx-auto">
              انضم إلى أكثر من 500 عائلة اختارت أكاديمية الرضوان لتعليم أطفالهم
              القرآن الكريم والعلوم الإسلامية
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end mb-8">
              <Button
                variant="secondary"
                size="lg"
                className="bg-accent hover:bg-accent-100 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-w-48"
              >
                <span className="flex items-center gap-2">
                  سجل الآن مجاناً
                  <FaArrowLeft className="w-4 h-4" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-w-48"
              >
                جرب درس تجريبي
              </Button>
            </div>

            {/* Contact Options */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span className="font-arabic text-sm">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="w-4 h-4" />
                <span className="font-arabic text-sm">واتساب مباشر</span>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="w-4 h-4" />
                <span className="font-arabic text-sm">info@alradwan.edu</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              {/* Placeholder for Image */}
              <div className="aspect-square bg-white/20 rounded-2xl flex items-center justify-center text-white/60">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">📚</span>
                  </div>
                  <p className="font-arabic text-lg">صورة تعليمية ملهمة</p>
                  <p className="font-arabic text-sm opacity-75 mt-2">
                    (سيتم إضافة صورة حقيقية للطلاب)
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/40 rounded-full"></div>
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-accent/60 rounded-full"></div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent font-arabic">
                  500+
                </div>
                <div className="text-sm text-text-secondary font-arabic">
                  طالب سعيد
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-accent rounded-2xl p-4 shadow-xl text-white">
              <div className="text-center">
                <div className="text-2xl font-bold font-arabic">98%</div>
                <div className="text-sm font-arabic opacity-90">
                  رضا الأهالي
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
