import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "@/components/ui/Button";

interface EnrollModalHeaderProps {
  courseName: string;
  onClose: () => void;
}

const EnrollModalHeader: React.FC<EnrollModalHeaderProps> = ({
  courseName,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border">
      <div>
        <h2 className="text-2xl font-bold text-text">تأكيد التسجيل</h2>
        <p className="text-text-muted mt-1">
          تسجيل في:{" "}
          <span className="font-medium text-primary">{courseName}</span>
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="hover:bg-gray-100 p-2 rounded-full"
      >
        <FaTimes className="text-gray-500" />
      </Button>
    </div>
  );
};

export default EnrollModalHeader;
