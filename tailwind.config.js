/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D13',
        surface: {
          DEFAULT: '#131722',
          card: '#161B28',
          hover: '#1D2436',
          active: '#242C42',
        },
        hairline: {
          DEFAULT: '#1F2637',
          subtle: '#181E2C',
          bright: '#2E3850',
        },
        amber: {
          accent: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        cyan: {
          telemetry: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.15)',
        },
        lime: {
          signal: '#84CC16',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Commit Mono', 'Fira Code', 'monospace'],
        serif: ['Instrument Serif', 'Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
