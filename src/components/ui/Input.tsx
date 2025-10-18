import React from "react";
import { InputProps } from "@/types";

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  error,
}) => {
  const baseClasses =
    "w-full px-3 py-2 border rounded-lg text-right font-arabic placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors";
  const errorClasses = error
    ? "border-error focus:ring-error focus:border-error"
    : "border-border";
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";

  const classes = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classes}
        disabled={disabled}
        required={required}
        dir="rtl"
      />
      {error && (
        <p className="mt-1 text-sm text-error text-right font-arabic">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
