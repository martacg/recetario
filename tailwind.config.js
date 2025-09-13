/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tomato: '#E63946',     // CTA
        basil:  '#457B9D',     // accents
        lemon:  '#FFD166',     // highlights
        paper:  '#F1FAEE',     // background
        ink:    '#333333',     // text
      },
      boxShadow: {
        card: '0 6px 20px -8px rgba(0,0,0,0.15)'
      },
      transitionTimingFunction: {
        'swift': 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    },
  },
  plugins: [],
}