/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          secondary: '#7C3AED',
          accent: '#06B6D4',
          bg: '#0F172A',
          card: '#1E293B',
          cardHover: '#26354A',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(37, 99, 235, 0.4)',
          text: '#F8FAFC',
          muted: '#94A3B8',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-secondary': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'glow-accent': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
