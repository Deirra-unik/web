/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans:    ['Outfit', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%':     { transform: 'translateY(-30px) scale(1.05)' },
        },
        overlayIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        modalIn: {
          from: { opacity: '0', transform: 'translateY(28px) scale(0.96)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        popIn: {
          from: { transform: 'scale(0)' },
          to:   { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'blob':       'blob 8s ease-in-out infinite',
        'overlay-in': 'overlayIn 0.25s ease',
        'modal-in':   'modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'pop-in':     'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
};
