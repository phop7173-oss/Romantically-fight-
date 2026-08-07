/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#ff7f98',
          500: '#ff6b8a',
          600: '#e95776',
        },
        surface: {
          900: '#111827',
          800: '#1f2937',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(255, 107, 138, 0.35)',
      },
    },
  },
  plugins: [],
};
