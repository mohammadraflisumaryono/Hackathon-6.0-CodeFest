/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-active::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px', // Panjang garis tetap
          height: '2px',  // Ketebalan garis
          backgroundColor: 'white', // Warna garis
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
