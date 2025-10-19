import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "error" | "accent";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium";

  const variantClasses = {
    default: "bg-gray-100 text-text-secondary",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-accent/10 text-accent",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    error: "bg-error/10 text-error",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
