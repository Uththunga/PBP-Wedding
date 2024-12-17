/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          beige: '#C5B9A5',  // Main beige color from logo
          dark: '#000000',   // Black color from logo
          light: '#F5F0EA',  // Lighter variation of beige
          muted: '#8A8178',  // Muted beige for text
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};