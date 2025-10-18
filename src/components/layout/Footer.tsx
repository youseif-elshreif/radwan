import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-text-primary font-arabic mb-4">
              معلومات التواصل
            </h3>
            <div className="space-y-2 text-text-secondary font-arabic">
              <p>📧 info@al-radwan.edu</p>
              <p>📞 +20 123 456 789</p>
              <p>📱 +20 987 654 321</p>
            </div>
          </div>

          {/* Address */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-text-primary font-arabic mb-4">
              العنوان
            </h3>
            <p className="text-text-secondary font-arabic">
              شارع المعز لدين الله
              <br />
              القاهرة، مصر
              <br />
              الرمز البريدي: 11511
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-text-primary font-arabic mb-4">
              روابط سريعة
            </h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-text-secondary hover:text-primary font-arabic transition-colors"
              >
                الشروط والأحكام
              </a>
              <a
                href="#"
                className="block text-text-secondary hover:text-primary font-arabic transition-colors"
              >
                سياسة الخصوصية
              </a>
              <a
                href="#"
                className="block text-text-secondary hover:text-primary font-arabic transition-colors"
              >
                الأسئلة الشائعة
              </a>
              <a
                href="#"
                className="block text-text-secondary hover:text-primary font-arabic transition-colors"
              >
                دعم فني
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-text-secondary font-arabic">
              © 2025 أكاديمية الرضوان. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
