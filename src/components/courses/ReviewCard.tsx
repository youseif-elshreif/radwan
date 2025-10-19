import Card from "@/components/ui/Card";
import { Review } from "@/types/course";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold">
          {review.student.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium text-text">{review.student}</h4>
          <div className="flex gap-1 mt-1">{renderStars(review.rating)}</div>
        </div>
      </div>

      <blockquote className="text-text-muted leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </blockquote>
    </Card>
  );
};

export default ReviewCard;
