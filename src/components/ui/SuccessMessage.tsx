import React, { useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

interface SuccessMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-start gap-3">
        <FaCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />

        <div className="flex-1">
          <p className="text-green-800 text-sm leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
