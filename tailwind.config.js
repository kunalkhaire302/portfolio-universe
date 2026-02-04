/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a192f',
        'space-blue': '#112240',
        'neon-teal': '#64ffda',
        'electric-blue': '#00d4ff',
        'star-white': '#e6f1ff',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
