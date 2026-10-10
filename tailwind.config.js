/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#F6F5F0',
        ink: '#111113',
        gold: {
          50: '#FDF8E7',
          100: '#FAEFC6',
          200: '#F4DF8F',
          300: '#EDCB5C',
          400: '#E3B53E',
          500: '#CFA12A',
          600: '#A98221',
          700: '#82641B',
          800: '#5E4815',
          900: '#3E300F',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        card: '20px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
