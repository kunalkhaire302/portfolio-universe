/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'surface': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'raised': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-bg-hover) / <alpha-value>)',
        'porcelain': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'lavender': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'coral': 'rgb(var(--color-accent) / <alpha-value>)',
        'coral-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        'lilac': 'rgb(var(--color-secondary) / <alpha-value>)',
        'lilac-hover': 'rgb(var(--color-secondary-hover) / <alpha-value>)',
        'accent-surface': 'rgb(var(--color-accent-surface) / <alpha-value>)',
        'border-subtle': 'rgb(var(--color-border-subtle) / <alpha-value>)',
        'border-interactive': 'rgb(var(--color-border-interactive) / <alpha-value>)',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Avenir Next', 'Segoe UI Variable', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(var(--color-accent) / 0.5)' },
          '100%': { boxShadow: '0 0 20px rgb(var(--color-accent) / 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
