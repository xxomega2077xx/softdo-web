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
          100: 'rgba(255, 255, 255, 0.04)',
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.15)',
          dark: 'rgba(0, 0, 0, 0.6)',
        },
        aurora: {
          purple: '#7C3AED',
          blue: '#2563EB',
          cyan: '#06B6D4',
          pink: '#F472B6',
          void: '#0B0E14',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'orb-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '50%': { transform: 'translate(-15px, -60px) scale(1.12)' },
          '75%': { transform: 'translate(-25px, -20px) scale(0.95)' },
        },
        'orb-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-35px, 25px) scale(1.1)' },
          '50%': { transform: 'translate(20px, 45px) scale(0.9)' },
          '75%': { transform: 'translate(30px, -15px) scale(1.05)' },
        },
        'orb-float-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.05) rotate(120deg)' },
          '66%': { transform: 'translate(-25px, 15px) scale(0.95) rotate(240deg)' },
        },
        'line-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(1)' },
          '50%': { opacity: '0.7', transform: 'scaleX(1.02)' },
        },
        'dot-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.5)', opacity: '1' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.03)', opacity: '0.8' },
        },
      },
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'border-beam': 'border-beam calc(var(--duration, 8s)*1s) infinite linear',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-sm': 'reveal-sm 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'float-gentle': 'float-gentle 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'orb-float-1': 'orb-float-1 20s ease-in-out infinite',
        'orb-float-2': 'orb-float-2 24s ease-in-out infinite',
        'orb-float-3': 'orb-float-3 22s ease-in-out infinite',
        'line-pulse': 'line-pulse 3s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'breathe': 'breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
