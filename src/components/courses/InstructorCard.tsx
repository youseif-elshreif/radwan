import Card from "@/components/ui/Card";

interface InstructorCardProps {
  instructor_name: string;
  instructor_id?: string;
  // يمكن إضافة المزيد من البيانات لاحقاً من جدول المدرسين
}

const InstructorCard: React.FC<InstructorCardProps> = ({ 
  instructor_name,
  instructor_id 
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {instructor_name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text mb-2">المدرس</h3>
          <p className="text-lg text-primary font-medium">{instructor_name}</p>
          <p className="text-sm text-text-muted mt-1">
            مدرس معتمد في الأكاديمية
          </p>
        </div>
      </div>
      
      {/* يمكن إضافة المزيد من التفاصيل هنا لاحقاً */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">5+</div>
            <div className="text-text-muted">سنوات خبرة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">100+</div>
            <div className="text-text-muted">طالب</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InstructorCard;