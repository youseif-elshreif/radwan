import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
  alignment?: "center" | "right";
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  accent = false,
  alignment = "center",
  className = "",
}) => {
  const alignmentClasses = {
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-12 ${alignmentClasses[alignment]} ${className}`}>
      {/* Decorative line above title */}
      <div
        className={`relative inline-block mb-6 ${
          alignment === "center" ? "mx-auto" : ""
        }`}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

        <h2 className="relative text-3xl sm:text-4xl font-bold font-arabic text-text-primary">
          {accent ? (
            <>
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={`${
                    index === Math.floor(title.split(" ").length / 2)
                      ? "text-accent"
                      : "text-text-primary"
                  } mx-1`}
                >
                  {word}{" "}
                </span>
              ))}
            </>
          ) : (
            <span className="bg-gradient-to-l from-text-primary via-accent/20 to-text-primary bg-clip-text text-transparent">
              {title}
            </span>
          )}

          {/* Decorative dot */}
          <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse-slow" />
        </h2>
      </div>

      {subtitle && (
        <p className="text-text-secondary font-arabic text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Bottom decorative element */}
      <div
        className={`mt-6 ${
          alignment === "center" ? "flex justify-center" : "flex justify-end"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-gradient-to-r from-primary to-accent" />
          <div className="w-1 h-1 bg-accent rounded-full animate-float" />
          <div className="w-6 h-px bg-gradient-to-r from-accent to-primary" />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
