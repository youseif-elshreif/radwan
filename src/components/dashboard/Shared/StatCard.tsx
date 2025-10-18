import React from "react";
import Card from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
  variant?: "default" | "islamic";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
  variant = "default",
}) => {
  return (
    <Card
      className={`${
        variant === "islamic"
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
          : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>

          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  change.trend === "up"
                    ? "text-green-600"
                    : change.trend === "down"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {change.trend === "up" && "+"}
                {change.value}%
              </span>
              <span className="text-xs text-gray-500 mr-1">
                من الشهر الماضي
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
