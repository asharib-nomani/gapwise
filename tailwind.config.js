/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6fc',
          100: '#e8ecf7',
          200: '#cbd4ee',
          300: '#9fb1e1',
          400: '#6c87d0',
          500: '#4763be',
          600: '#34499d',
          700: '#27387d',
          800: '#1b2659',
          900: '#10173b',
          950: '#090d23',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
