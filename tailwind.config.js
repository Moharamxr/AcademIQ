/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "#C1E5FF",
        "active-bg": "rgba(0, 118, 158, 0.08)",
        "active-br": "rgba(0, 118, 158, 1)",
        active: "rgba(0, 118, 158, 1)",
        default: "rgba(148, 163, 184, 1)",

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '772px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
