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
        'space-dark': '#061426',
        'space-blue': '#102b44',
        'neon-teal': '#27d9f3',
        'electric-blue': '#4d7cff',
        'star-white': '#f4f8ff',
        'planet-orange': '#ff6b35',
        'project-purple': '#7b2cbf',
        'cert-gold': '#ffd700',
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
          '0%': { boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
