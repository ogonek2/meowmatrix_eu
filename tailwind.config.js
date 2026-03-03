/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1.5rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)', { lineHeight: '1.15' }],
      },
      colors: {
        night: {
          900: '#050816',
          800: '#070b16',
        },
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top left, rgba(147, 51, 234, 0.35), transparent 55%), radial-gradient(circle at top right, rgba(56, 189, 248, 0.25), transparent 55%)',
        'brand-gradient': 'linear-gradient(135deg, #a855f7, #3b82f6)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.12))',
      },
      boxShadow: {
        'soft-xl':
          '0 16px 40px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.08)',
      },
      borderRadius: {
        '4xl': '2.25rem',
      },
    },
  },
  plugins: [],
}

