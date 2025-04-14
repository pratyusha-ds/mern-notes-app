/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        background: "url('/images/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};
