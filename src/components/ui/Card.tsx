import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
}) => {
  const baseClasses =
    "relative overflow-hidden bg-surface border border-border rounded-xl p-6 shadow-sm";
  const hoverClasses = hoverable
    ? "hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
    : "transition-all";

  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
      />
      {children}
    </div>
  );
};

export default Card;
