/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f0c8cc',
        rose: '#d4878f',
        burgundy: '#6b2d3e',
        cream: '#fdf6f0',
        ivory: '#faf4ed',
        gold: '#c9a84c',
        'gold-light': '#e8c97a',
        terracotta: '#c9684a',
        wine: '#8b1a2f',
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'serif'],
        script: ['"Frank Ruhl Libre"', 'serif'],
        body: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
