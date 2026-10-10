/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Outfit Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FBF7EC',
          100: '#F5EBD0',
          200: '#EBD8A4',
          300: '#E1C377',
          400: '#D9B257',
          500: '#C99E3C',
          600: '#A98230',
          700: '#866627',
          800: '#644C1F',
          900: '#463616',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        card: '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
