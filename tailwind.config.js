/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "brickwork-orange": "#FF9900",
        "brickwork-blue": "#002A6E",
        "brickwork-dark-blue": "#001B4C",
        "brickwork-light-blue": "#B9D1F8",
      },
      boxShadow: {
        md: "0 4px 6px -1px rgba(0, 42, 110, 0.1), 0 2px 4px -1px rgba(0, 42, 110, 0.06)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
