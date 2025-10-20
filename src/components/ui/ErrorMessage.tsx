import React, { useEffect } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
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
    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-start gap-3">
        <FaExclamationCircle className="text-red-500 text-xl mt-0.5 flex-shrink-0" />

        <div className="flex-1">
          <p className="text-red-800 text-sm leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
