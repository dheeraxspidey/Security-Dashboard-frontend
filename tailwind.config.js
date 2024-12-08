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
        primary: {
          50: '#172554',
          100: '#1e3a8a',
          200: '#1e40af',
          300: '#1d4ed8',
          400: '#2563eb',
          500: '#3b82f6',
          600: '#60a5fa',
          700: '#93c5fd',
          800: '#bfdbfe',
          900: '#dbeafe',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'dark-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 6px 10px -1px rgba(0, 0, 0, 0.4), 0 2px 6px -2px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 12px 24px -4px rgba(0, 0, 0, 0.4), 0 8px 12px -4px rgba(0, 0, 0, 0.4)',
        'dark-glow': '0 0 15px rgba(59, 130, 246, 0.3)',
        'dark-glow-lg': '0 0 25px rgba(59, 130, 246, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-mesh': 'linear-gradient(45deg, rgba(30, 58, 138, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(30, 58, 138, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(30, 58, 138, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(30, 58, 138, 0.1) 75%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

