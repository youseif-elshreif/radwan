import React from "react";
import Badge from "@/components/ui/Badge";
import { FaStar } from "react-icons/fa";

interface FeaturedBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const iconSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Badge
      variant="primary"
      className={`flex items-center gap-1 ${sizeClasses[size]} ${className}`}
    >
      <FaStar className={iconSizes[size]} />
      <span>مميز</span>
    </Badge>
  );
};

export default FeaturedBadge;
