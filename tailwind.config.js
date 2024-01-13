/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        inter: "'Inter Tight', sans-serif",
      },
      backgroundImage: {
        "registration-img": "url('assets/bridge.jpg')",
        "login-img": "url('assets/bridge-img.webp')",
      },
    },
  },
  plugins: [],
};
