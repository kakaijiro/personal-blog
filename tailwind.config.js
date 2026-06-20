/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        'bg-secondary': 'hsl(var(--bg-secondary))',
        border: 'hsl(var(--border))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        accent: 'hsl(var(--accent))',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'preset-1': ['40px', { lineHeight: '1.2', letterSpacing: '-0.5px', fontWeight: '800' }],
        'preset-2': ['32px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '800' }],
        'preset-3': ['28px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '700' }],
        'preset-4': ['24px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '600' }],
        'preset-5': ['20px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '600' }],
        'preset-6': ['18px', { lineHeight: '1.5', letterSpacing: '-0.5px', fontWeight: '500' }],
        'preset-7': ['18px', { lineHeight: '1.5', letterSpacing: '-0.2px', fontWeight: '400' }],
        'preset-8': ['16px', { lineHeight: '1.3', letterSpacing: '-0.2px', fontWeight: '400' }],
        'preset-9': ['14px', { lineHeight: '1.3', letterSpacing: '-0.2px', fontWeight: '400' }],
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1440px',
      },
      maxWidth: {
        content: '1200px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'hsl(var(--text-secondary))',
            a: {
              color: 'hsl(var(--accent))',
              '&:hover': { opacity: '0.8' },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--text-primary))',
            },
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: 'hsl(var(--bg-secondary))',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: 'hsl(var(--bg-secondary))',
              border: '1px solid hsl(var(--border))',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--accent))',
              backgroundColor: 'hsl(var(--bg-secondary))',
              padding: '0.75rem 1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'normal',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            'thead th': {
              color: 'hsl(var(--text-primary))',
              borderBottomColor: 'hsl(var(--border))',
            },
            'tbody td': {
              borderBottomColor: 'hsl(var(--border))',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
