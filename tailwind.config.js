/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0a',
        cream: '#fafaf8',
        gold: {
          50: '#fffdf5',
          100: '#fff9e0',
          200: '#fff0b8',
          300: '#ffe380',
          400: '#ffd03b',
          500: '#f5b800',
          600: '#cc9900',
          700: '#a37a00',
          800: '#7a5c00',
          900: '#523d00',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
