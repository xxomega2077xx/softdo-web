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
          100: 'rgba(255, 247, 237, 0.04)',
          200: 'rgba(255, 247, 237, 0.08)',
          300: 'rgba(255, 247, 237, 0.16)',
          dark: 'rgba(12, 10, 9, 0.7)',
        },
        warm: {
          50: '#FAF9F7',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        accent: {
          DEFAULT: '#D4714E',
          light: '#E8956F',
          dark: '#B85A3B',
          amber: '#D9A962',
        },
        aurora: {
          terracotta: '#D4714E',
          amber: '#D9A962',
          rose: '#E8956F',
          void: '#0C0A09',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'pulse-warm': {
          '0%, 100%': { opacity: '0.3', boxShadow: '0 0 20px rgba(212, 113, 78, 0.1)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 40px rgba(212, 113, 78, 0.2)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'orb-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'orb-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, 30px) scale(1.15)' },
          '66%': { transform: 'translate(25px, -35px) scale(0.85)' },
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
          '50%': { transform: 'scale(1.08)', opacity: '0.8' },
        },
        'warm-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
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
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'orb-float-1': 'orb-float-1 15s ease-in-out infinite',
        'orb-float-2': 'orb-float-2 18s ease-in-out infinite',
        'line-pulse': 'line-pulse 3s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'warm-pulse': 'warm-pulse 3s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
