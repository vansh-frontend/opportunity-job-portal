/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A843',
          light: '#F2C96A',
          dim: 'rgba(212,168,67,0.15)'
        },
        bg: {
          DEFAULT: '#080A0F',
          2: '#0D1018',
          3: '#131720'
        },
        surface: {
          DEFAULT: '#161C27',
          2: '#1E2535'
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        gold: '0 8px 24px rgba(212,168,67,0.3)',
        card: '0 16px 40px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
