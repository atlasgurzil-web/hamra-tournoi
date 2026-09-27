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
        // Deep Obsidian Canvas
        night: {
          950: '#070A10',
          900: '#0A0E17', // Vercel official deep canvas
          850: '#0E1422',
          800: '#141C2E',
          card: '#0F172A',
          border: '#1E293B',
          borderLight: '#334155',
        },
        // Hamra Crimson Red (Club Official)
        hamra: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          DEFAULT: '#E11D48',
          vibrant: '#EF4444',
          crimson: '#DC2626',
        },
        // Trophy Gold & Amber
        gold: {
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
          DEFAULT: '#F59E0B',
        },
        // Emerald for verification / success
        emerald: {
          400: '#34D399',
          500: '#10B981',
          950: '#022C22',
        },
        slate: {
          750: '#26334A',
          850: '#131D31',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Instrument Serif', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'hamra-glow': '0 0 35px -5px rgba(225, 29, 72, 0.4), 0 0 15px -3px rgba(225, 29, 72, 0.2)',
        'gold-glow': '0 0 30px -5px rgba(245, 158, 11, 0.35)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 4px 12px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
