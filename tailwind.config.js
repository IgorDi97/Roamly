/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        sand: {
          50:  '#faf9f6',
          100: '#f2ede4',
          200: '#e8dfd0',
          300: '#d4c9b5',
          400: '#b8a890',
          500: '#9e8e78',
          600: '#85745f',
          700: '#6b5c4b',
          800: '#52463a',
          900: '#3a302a',
        },
        ocean: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfd',
          300: '#7cc2fb',
          400: '#38a3f5',
          500: '#0e87e2',
          600: '#026bc0',
          700: '#02569b',
          800: '#064a80',
          900: '#0b3d6b',
        },
        forest: {
          50:  '#f0faf4',
          100: '#dbf3e5',
          200: '#b9e6cd',
          300: '#85d1ab',
          400: '#4ab582',
          500: '#279962',
          600: '#187b4e',
          700: '#146240',
          800: '#124f35',
          900: '#10412d',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
