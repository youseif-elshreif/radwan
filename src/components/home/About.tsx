import React from "react";
import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import {
  FaMosque,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdVerified, MdSchool } from "react-icons/md";

const About: React.FC = () => {
  const features = [
    {
      icon: <FaMosque className="w-8 h-8" />,
      title: "بيئة إسلامية أصيلة",
      description:
        "نوفر بيئة تعليمية متميزة تجمع بين الأصالة الإسلامية والحداثة التعليمية",
    },
    {
      icon: <MdVerified className="w-8 h-8" />,
      title: "منهج معتمد ومتطور",
      description:
        "مناهج حديثة ومعتمدة تواكب أحدث طرق التعليم العالمية مع الحفاظ على القيم الإسلامية",
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "مدرسين مؤهلين",
      description:
        "نخبة من المعلمين المؤهلين والمتخصصين في مجالاتهم مع خبرة عملية واسعة",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "مجتمع تعليمي متكامل",
      description:
        "نبني مجتمعاً تعليمياً يشارك فيه الطلاب وأولياء الأمور في رحلة التعلم",
    },
    {
      icon: <MdSchool className="w-8 h-8" />,
      title: "تقنيات حديثة",
      description:
        "استخدام أحدث التقنيات التعليمية والوسائل التفاعلية لضمان تجربة تعليمية ممتعة",
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "متابعة مستمرة",
      description:
        "نوفر متابعة مستمرة لتقدم الطلاب مع تقارير دورية لأولياء الأمور",
    },
  ];

  const instructors = [
    {
      name: "أ. أحمد محمد",
      title: "مدير الأكاديمية",
      specialty: "تعليم القرآن الكريم",
      experience: "15 سنة خبرة",
      description: "حافظ للقرآن الكريم مع إجازة في القراءات العشر",
    },
    {
      name: "أ. فاطمة علي",
      title: "مدرسة اللغة العربية",
      specialty: "النحو والصرف",
      experience: "12 سنة خبرة",
      description: "خريجة دار العلوم، متخصصة في تعليم النحو للأطفال",
    },
    {
      name: "أ. عبدالرحمن سالم",
      title: "مدرس التفسير",
      specialty: "علوم القرآن",
      experience: "18 سنة خبرة",
      description: "دكتوراه في التفسير وعلوم القرآن من الأزهر الشريف",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 bg-gradient-to-b from-background to-surface overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="none" stroke="%23336154" stroke-opacity="0.1"><circle cx="50" cy="50" r="40" stroke-width="1"/><path d="M50 10v80M10 50h80" stroke-width="0.5"/></g></svg>\')',
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="لماذا أكاديمية الرضوان؟"
          subtitle="نحن نؤمن بأن التعليم الإسلامي الأصيل هو الأساس لبناء جيل واعٍ ومتميز، لذلك نقدم تجربة تعليمية فريدة تجمع بين العلم والإيمان"
          accent={true}
        />

        {/* Why Choose Us Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-surface rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <div className="mr-4 flex-1">
                  <h3 className="text-lg font-semibold text-text-primary font-arabic">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-text-secondary font-arabic text-right leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Instructor Profiles */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-text-primary font-arabic mb-4">
              طاقم التدريس المتميز
            </h3>
            <p className="text-text-secondary font-arabic text-lg max-w-2xl mx-auto">
              نخبة من المعلمين المتخصصين والمؤهلين لتقديم أفضل تجربة تعليمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaChalkboardTeacher className="text-3xl text-primary" />
                </div>
                <h4 className="text-xl font-bold text-text-primary font-arabic mb-2">
                  {instructor.name}
                </h4>
                <p className="text-accent font-medium font-arabic mb-1">
                  {instructor.title}
                </p>
                <p className="text-sm text-text-secondary font-arabic mb-2">
                  {instructor.specialty} • {instructor.experience}
                </p>
                <p className="text-text-secondary font-arabic text-sm leading-relaxed">
                  {instructor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mosque Introduction */}
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FaMosque className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary font-arabic mb-6">
              أكاديمية الرضوان للتعليم الإسلامي
            </h3>
            <p className="text-text-secondary font-arabic text-lg leading-relaxed mb-8">
              تأسست أكاديمية الرضوان انطلاقاً من إيماننا العميق بأهمية التعليم
              الإسلامي الأصيل في بناء شخصية الطفل المسلم. نحن نسعى لخلق بيئة
              تعليمية متكاملة تجمع بين تعليم القرآن الكريم واللغة العربية
              والعلوم الشرعية، مع الاستفادة من أحدث الوسائل التعليمية والتقنيات
              الحديثة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                تعرف على مناهجنا
              </Button>
              <Button variant="outline" size="lg">
                اتصل بنا الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
