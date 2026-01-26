/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.1)',
          300: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(0, 0, 0, 0.6)',
        },
        aurora: {
          purple: '#7C3AED',
          blue: '#2563EB',
          pink: '#F472B6',
          void: '#0B0E14',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'border-beam': 'border-beam 3s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(10%, 10%) rotate(360deg)' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        reveal: {
          '0%': { opacity: '0.01', transform: 'translateY(30px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'reveal-sm': {
          '0%': { opacity: '0.01', transform: 'translateY(15px)', filter: 'blur(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'border-beam': 'border-beam calc(var(--duration, 8s)*1s) infinite linear',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-sm': 'reveal-sm 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 8s linear infinite',
      },
    },
  },
  plugins: [],
}

