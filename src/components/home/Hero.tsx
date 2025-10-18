import React from "react";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-11 flex items-center justify-center overflow-hidden">
      {/* Background - Gradient fallback if hero.jpg doesn't exist */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary to-primary-100"></div>

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/imgs/hero.jpg)" }}
      ></div>

      {/* Islamic geometric pattern overlay (lightweight SVG) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 40 40"><g fill="none" stroke="%23ffffff" stroke-opacity="0.25" stroke-width="0.5"><path d="M20 0l10 10-10 10L10 10 20 0z"/><path d="M0 20l10 10-10 10L-10 30 0 20z" transform="translate(10 -10)"/><path d="M20 20l10 10-10 10L10 30 20 20z"/></g></svg>\')',
          backgroundSize: "160px 160px",
        }}
      ></div>

      {/* Floating accent shapes */}
      <div className="absolute -top-6 left-6 w-24 h-24 rounded-full bg-accent/30 blur-2xl animate-float motion-reduce:hidden" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl animate-float [animation-delay:1.2s] motion-reduce:hidden" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-arabic">
          أكاديمية الرضوان
          <span className="mx-2 text-accent"> للتعليم </span>
          المتميز
        </h1>

        <p className="text-xl sm:text-2xl mb-8 font-arabic text-white/90 max-w-2xl mx-auto">
          نقدم أفضل البرامج التعليمية للأطفال والشباب في بيئة تعليمية محفزة
          ومبتكرة
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA: uses brand primary color per design system */}
          <Button variant="primary" size="lg" className="min-w-48">
            تصفح الكورسات
          </Button>

          {/* Secondary CTA: accent outline (no white fill) */}
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent min-w-48"
          >
            سجل الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
