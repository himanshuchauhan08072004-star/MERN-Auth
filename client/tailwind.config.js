/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          light: "rgb(var(--surface-light) / <alpha-value>)",
          border: "rgb(var(--surface-border) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
        },
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
