import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { FaBookOpen, FaUsers, FaGamepad, FaFootballBall } from "react-icons/fa";
import { MdLibraryBooks, MdPalette } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Activities: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "حلقات تحفيظ القرآن",
      description:
        "برامج متدرجة لحفظ القرآن الكريم مع التجويد والتفسير المبسط للأطفال",
      icon: <FaBookOpen className="w-8 h-8" />,
      image: "/imgs/quran-circle.jpg",
      color: "from-primary to-primary-100",
    },
    {
      id: 2,
      title: "ورش اللغة العربية",
      description:
        "أنشطة تفاعلية لتعلم النحو والصرف والأدب العربي بطرق ممتعة ومبتكرة",
      icon: <MdLibraryBooks className="w-8 h-8" />,
      image: "/imgs/arabic-workshop.jpg",
      color: "from-accent to-accent-100",
    },
    {
      id: 3,
      title: "الأنشطة الرياضية",
      description:
        "برامج رياضية متنوعة تهدف لبناء الجسم السليم والروح الرياضية الإسلامية",
      icon: <FaFootballBall className="w-8 h-8" />,
      image: "/imgs/sports-activity.jpg",
      color: "from-success to-green-400",
    },
    {
      id: 4,
      title: "الفنون الإسلامية",
      description:
        "تعلم الخط العربي والزخرفة الإسلامية والفنون التراثية الأصيلة",
      icon: <MdPalette className="w-8 h-8" />,
      image: "/imgs/islamic-art.jpg",
      color: "from-purple-500 to-purple-400",
    },
    {
      id: 5,
      title: "المسابقات الثقافية",
      description:
        "مسابقات متنوعة في القرآن والسنة والثقافة الإسلامية لتحفيز الطلاب",
      icon: <FaGamepad className="w-8 h-8" />,
      image: "/imgs/competitions.jpg",
      color: "from-yellow-500 to-yellow-400",
    },
    {
      id: 6,
      title: "النشاطات الاجتماعية",
      description: "فعاليات تطوعية وخيرية لغرس قيم العطاء والتكافل الاجتماعي",
      icon: <FaUsers className="w-8 h-8" />,
      image: "/imgs/social-activities.jpg",
      color: "from-blue-500 to-blue-400",
    },
  ];

  return (
    <section
      id="activities"
      className="relative py-16 bg-gradient-to-r from-background via-surface to-background overflow-hidden"
    >
      {/* Background Elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="%23e47a2e" stroke-opacity="0.1"><circle cx="40" cy="40" r="30" stroke-width="1"/><path d="M40 10l8 24h26l-21 15 8 24-21-15-21 15 8-24-21-15h26z" stroke-width="0.8"/></g></svg>\')',
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="أنشطتنا المتنوعة"
          subtitle="نقدم باقة شاملة من الأنشطة التعليمية والترفيهية التي تساهم في بناء شخصية الطفل المسلم المتكاملة"
          accent={true}
        />

        {/* Activities Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 100,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".activities-next",
              prevEl: ".activities-prev",
            }}
            pagination={{
              clickable: true,
              el: ".activities-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="activities-swiper"
          >
            {activities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <div className="group relative bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-90`}
                    />
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${activity.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      {activity.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-primary font-arabic mb-3 group-hover:text-accent transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-text-secondary font-arabic text-right leading-relaxed text-sm">
                      {activity.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button className="activities-prev w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full flex items-center justify-center transition-colors">
              ←
            </button>
            <div className="activities-pagination flex justify-center"></div>
            <button className="activities-next w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full flex items-center justify-center transition-colors">
              →
            </button>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-arabic mb-2">
              25+
            </div>
            <div className="text-text-secondary font-arabic text-sm">
              نشاط مختلف
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-arabic mb-2">
              200+
            </div>
            <div className="text-text-secondary font-arabic text-sm">
              طالب مشارك
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-arabic mb-2">
              15
            </div>
            <div className="text-text-secondary font-arabic text-sm">
              مدرب متخصص
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent font-arabic mb-2">
              95%
            </div>
            <div className="text-text-secondary font-arabic text-sm">
              رضا الطلاب
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
