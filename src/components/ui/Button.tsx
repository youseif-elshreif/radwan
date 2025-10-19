import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 shadow-sm";

  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary shadow-md hover:shadow-lg",
    secondary:
      "bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent shadow-md hover:shadow-lg",
    outline:
      "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white focus-visible:ring-accent",
    ghost:
      "text-accent hover:bg-accent/10 focus-visible:ring-accent hover:shadow-sm",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="w-4 h-4 mr-2 animate-spin text-current" />
      )}
      {children}
    </button>
  );
};

export default Button;
