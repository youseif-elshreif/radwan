import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#336154",
          100: "#4d7f6f",
        },
        accent: {
          DEFAULT: "#e47a2e",
          100: "#f29b56",
        },
        background: "#f9f9f9",
        surface: "#ffffff",
        text: {
          primary: "#1f1f1f",
          secondary: "#6b6b6b",
        },
        border: "#e2e2e2",
        success: "#3fa36b",
        error: "#e64545",
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "Cairo", "Tajawal", "sans-serif"],
        ui: ["var(--font-poppins)", "Poppins", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
      spacing: {
        "18": "4.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".85" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in .6s ease-out both",
        "scale-in": "scale-in .45s ease-out both",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
