/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#080B14',
        graphite2: '#111729',
        ice: '#F5F7FB',
        blue: '#3E63F5',
        'blue-light': '#7C97FF',
        'blue-glow': '#3D6BFF',
        gold: '#C9A24B',
        line: 'rgba(140,165,255,0.14)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-dots':
          'radial-gradient(rgba(140,165,255,0.14) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-dots': '22px 22px',
      },
    },
  },
  plugins: [],
}
