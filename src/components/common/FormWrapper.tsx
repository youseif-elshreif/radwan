import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}
    >
      {/* Islamic geometric pattern background */}
      <div
        className="relative bg-gradient-to-br from-primary/5 to-accent/5 px-8 py-12 text-center"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g fill="none" stroke="%23336154" stroke-opacity="0.08"><circle cx="30" cy="30" r="25" stroke-width="1"/><path d="M30 5v50M5 30h50" stroke-width="0.5"/><circle cx="30" cy="30" r="15" stroke-width="0.5"/><circle cx="30" cy="30" r="8" stroke-width="0.5"/></g></svg>')`,
          backgroundSize: "60px 60px",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-primary mb-3">{title}</h1>
          {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-12 h-12 border border-accent/20 rounded-full animate-float"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 bg-accent/10 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="px-8 py-10">{children}</div>
    </div>
  );
};

export default FormWrapper;
