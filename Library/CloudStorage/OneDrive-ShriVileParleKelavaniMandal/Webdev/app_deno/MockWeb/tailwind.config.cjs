/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
      },
      boxShadow: {
        'navbar': '0 0 15px rgba(0,0,0,0.15)',
        'navbar-glow': '0 8px 32px 0 #95bbe0, 0 0 10px 0 #95bbe0',
        'chat': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      colors: {
        'aether-dark-blue': '#02040A',
        'glow-sapphire': 'rgba(2, 12, 27, 0.7)',
        'glow-cream': 'rgba(8, 20, 45, 0.6)',
        'footer-text': '#A0A0A0',
        'footer-divider': 'rgba(255, 255, 255, 0.2)',
        // New colors for the predictor page
        'panel-dark': 'rgba(23, 22, 28, 0.5)',
        'accent-teal': '#00F6FF',
        'accent-teal-dark': '#00B4BD',
        'gauge-background': '#2D2D3A',
        'gauge-fill': '#00F6FF',
        'text-muted': '#8A8A93',
      },
      backgroundSize: {
        'footer': '300% 300%',
      },
      keyframes: {
        'footer-fade-in': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'footer-glow': {
          '0%, 100%': { 'background-position': '0% 50%', 'transform': 'scale(1)' },
          '25%': { 'background-position': '50% 25%', 'transform': 'scale(1.05)' },
          '50%': { 'background-position': '100% 50%', 'transform': 'scale(1)' },
          '75%': { 'background-position': '50% 75%', 'transform': 'scale(1.05)' },
        },
        'ripple': {
          '0%, 100%': { 'transform': 'translate(-50%, -50%) scale(0.6)', 'opacity': '0.9' },
          '25%, 75%': { 'transform': 'translate(-50%, -50%) scale(0.8)', 'opacity': '0.7' },
          '50%': { 'transform': 'translate(-50%, -50%) scale(1.1)', 'opacity': '0.5' },
        },
      },
      animation: {
        'footer-fade-in': 'footer-fade-in 1.5s ease-in-out 0.5s forwards',
        'footer-glow': 'footer-glow 25s ease-in-out infinite',
        'ripple': 'ripple 8s ease-in-out infinite',
        'ripple-delay': 'ripple 8s ease-in-out infinite 4s',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}