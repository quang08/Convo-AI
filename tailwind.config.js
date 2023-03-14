/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "200px",
      sm: "380px",
      xsm: "400px",
      md: "420px",
      lg: "900px",
      xl: "1440px",
    },
  },
  plugins: [],
};
