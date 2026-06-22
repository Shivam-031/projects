/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-0': '#000000',
        'bg-1': '#161515',
        'bg-2': '#1A1919',
        card: '#1e1e1e',
        brand: {
          red: '#FF4C4C',
          'red-deep': '#992E2E',
          blue: '#2A1FD9',
          yellow: '#FFC702',
        },
        grey: {
          1: '#D9D9D9',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1320px',
      },
      keyframes: {
        pulsedot: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 76, 76, .6)' },
          '70%': { boxShadow: '0 0 0 8px rgba(255, 76, 76, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 76, 76, 0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.8s infinite',
      },
    },
  },
  plugins: [],
}
