/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        // Warm gold pulled from the golden-hour hero — used sparingly as an accent
        // (section numbers, timeline, small highlights) to break up the cream-on-dark.
        accent: "#CBA45A",
        // Warm-tinted dark palette (replaces pure #000) to match the cream accent.
        ink: "#0b0a08",
        surface: {
          DEFAULT: "#14110d", // large editorial panels
          raised: "#17140f", // cards
        },
      },
      fontFamily: {
        serif: ['"Times New Roman"', "Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
