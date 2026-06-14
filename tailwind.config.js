/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        cream: {
          50: '#FDF8F0',
          100: '#F8EFE0',
          200: '#F0E2C9',
          300: '#E5D0A8',
          400: '#D4B882',
          500: '#C49F5F',
        },
        brown: {
          50: '#F5EFE6',
          100: '#E8DCC8',
          200: '#D4BE9A',
          300: '#BC9A6B',
          400: '#A67C4F',
          500: '#8B5A2B',
          600: '#734925',
          700: '#5C3A1F',
          800: '#452C18',
          900: '#2E1D10',
        },
        rust: {
          400: '#D65347',
          500: '#C04848',
          600: '#A03B3B',
          700: '#7E2F2F',
        },
        paper: '#FDF8F0',
        sepia: '#7B5E3C',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(139, 90, 43, 0.1)',
        'card-hover': '0 8px 30px rgba(139, 90, 43, 0.18)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'paper-texture': "radial-gradient(circle at 20% 30%, rgba(139, 90, 43, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 90, 43, 0.04) 0%, transparent 50%)",
        'gradient-warm': 'linear-gradient(135deg, #FDF8F0 0%, #F5EFE6 50%, #E8DCC8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(251, 191, 36, 0.7)' },
          '100%': { boxShadow: '0 0 0 20px rgba(251, 191, 36, 0)' },
        },
      },
    },
  },
  plugins: [],
};
