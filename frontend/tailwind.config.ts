import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#000000",
          DEFAULT: "#000000",
        },
        surface: {
          elevated: "#16181a",
          DEFAULT: "#16181a",
        },
        primary: {
          DEFAULT: "#494fdf",
          50: "#f3f4ff",
          100: "#e5e6fd",
          200: "#cacdfb",
          300: "#afb3f9",
          400: "#949af7",
          500: "#494fdf",
          600: "#3538ed",
          700: "#2b2db9",
          800: "#212385",
          900: "#171851",
        },
        income: {
          DEFAULT: "#00a87e",
          green: "#00a87e",
          50: "#e6f9f3",
          100: "#c4f4e2",
          200: "#8be9c7",
          300: "#52ddab",
          400: "#1ad190",
          500: "#00a87e",
          600: "#008d68",
          700: "#007152",
          800: "#00553c",
          900: "#003826",
        },
        expense: {
          DEFAULT: "#e23b4a",
          red: "#e23b4a",
          50: "#fce9eb",
          100: "#f9ced2",
          200: "#f39ca8",
          300: "#ed6b7e",
          400: "#e7415b",
          500: "#e23b4a",
          600: "#b82d3b",
          700: "#8e232d",
          800: "#64181f",
          900: "#3a0d11",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Aeonik Pro", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "20px",
        lg: "20px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
