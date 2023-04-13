/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        "brickwork-blue": "#0D1938",
        "brickwork-yellow": "#FFC700",
      },
      textColor: {
        "brickwork-blue": "#0D1938",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
