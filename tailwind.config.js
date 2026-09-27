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
        // Claude Signature Terracotta
        claude: {
          50: '#FBF7F4',
          100: '#F6ECE6',
          200: '#ECD5C8',
          300: '#E1B8A4',
          400: '#E2896B',
          500: '#D97757', // Terracotta officielle Anthropic Claude
          600: '#C15F3C', // Terracotta soutenu
          700: '#9E492B',
          800: '#7D371E',
          900: '#5F2915',
          DEFAULT: '#D97757',
        },
        // Warm Obsidian & Parchment Dark Canvas
        obsidian: {
          DEFAULT: '#141413',
          surface: '#1B1A17',
          card: '#21201C',
          cardHover: '#292824',
          border: '#2E2C27',
          borderStrong: '#3D3A33',
        },
        parchment: {
          DEFAULT: '#F5F2EB',
          subtle: '#FAF7F2',
          secondary: '#BDB8AD',
          muted: '#7D786F',
        },
        brass: {
          DEFAULT: '#D4A373',
          light: '#E6C594',
          dark: '#A67C52',
        },
        sage: {
          DEFAULT: '#7E9F80',
          subtle: '#9EBF9F',
        },
        // Compatibilité avec l'héritage Hamra
        hamra: {
          50: '#FBF7F4',
          100: '#F6ECE6',
          200: '#ECD5C8',
          300: '#E1B8A4',
          400: '#E2896B',
          500: '#D97757',
          600: '#C15F3C',
          700: '#A84424',
          800: '#8A2E14',
          900: '#661C08',
          950: '#1F1E1B',
        },
        board: {
          light: '#F5F2EB',
          tileLight: '#E8E3D7',
          tileDark: '#5C564B',
          tileRed: '#C15F3C',
          tileCream: '#FBF7F4',
          charcoal: '#1B1A17',
          dark: '#141413',
          nocturne: '#0F0F0E',
        },
        trophy: {
          gold: '#D4A373',
          silver: '#BDB8AD',
          bronze: '#A67C52',
        }
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Cinzel', 'Georgia', 'serif'],
        display: ['Instrument Serif', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        sport: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        arabic: ['Noto Sans Arabic', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'claude': '0 10px 25px -5px rgba(217, 119, 87, 0.18), 0 8px 10px -6px rgba(217, 119, 87, 0.12)',
        'claude-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.6), 0 2px 8px -1px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
