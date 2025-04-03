/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        upscale: {
          "0%, 100%": { transform: "scale(1)", opacity: "100%" },
          "50%": { transform: "scale(1.5)", opacity: "50%" },
        },
      },
      animation: {
        upscale: "upscale 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
