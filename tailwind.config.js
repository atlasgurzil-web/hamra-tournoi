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
        hamra: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626', // Rouge principal officiel
          700: '#b91c1c',
          800: '#991b1b', // Rouge profond club
          900: '#7f1d1d', // Bordeaux sombre
          950: '#450a0a',
        },
        board: {
          light: '#f8fafc',
          tileLight: '#e2e8f0',
          tileDark: '#94a3b8',
          tileRed: '#991b1b',
          tileCream: '#f1f5f9',
          charcoal: '#1e293b',
          dark: '#0f172a',
          nocturne: '#090d16',
        },
        trophy: {
          gold: '#f59e0b',
          silver: '#94a3b8',
          bronze: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Barlow Condensed', 'sans-serif'],
        sport: ['Barlow Condensed', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        arabic: ['Noto Sans Arabic', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'club': '0 10px 25px -5px rgba(220, 38, 38, 0.15), 0 8px 10px -6px rgba(220, 38, 38, 0.1)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
