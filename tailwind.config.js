/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          600: "#475569",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
