/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        matcha: { 50: '#f1f5ec', 100: '#e1ead6', 300: '#a3b98a', 500: '#5f7f45', 700: '#3f5a2c', 900: '#2a3d1c' },
        cream: { 50: '#fffdf8', 100: '#faf5e9', 200: '#f1e8d2' },
        hoji: '#7a3e1d',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
