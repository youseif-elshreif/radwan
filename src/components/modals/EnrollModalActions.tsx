import React from "react";
import Button from "@/components/ui/Button";
import { FaSpinner, FaTimes, FaCheck } from "react-icons/fa";

interface EnrollModalActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
  seatsAvailable: boolean;
}

const EnrollModalActions: React.FC<EnrollModalActionsProps> = ({
  onCancel,
  onConfirm,
  loading,
  seatsAvailable,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-6 bg-surface border-t border-border">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={loading}
        className="flex-1 order-2 sm:order-1"
      >
        <FaTimes className="ml-2" />
        إلغاء
      </Button>

      <Button
        variant="primary"
        onClick={onConfirm}
        disabled={loading}
        className="flex-1 order-1 sm:order-2"
      >
        {loading ? (
          <>
            <FaSpinner className="ml-2 animate-spin" />
            جاري التسجيل...
          </>
        ) : (
          <>
            <FaCheck className="ml-2" />
            {seatsAvailable ? "تأكيد التسجيل" : "انضمام لقائمة الانتظار"}
          </>
        )}
      </Button>
    </div>
  );
};

export default EnrollModalActions;
