/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(53 187 255 / 0.05)',
          100: 'rgb(53 187 255 / 0.1)',
          200: 'rgb(53 187 255 / 0.2)',
          300: 'rgb(53 187 255 / 0.3)',
          500: 'rgb(53 187 255 / 0.5)',
          900: 'rgb(53 187 255 / 1)',
          DEFAULT: 'rgb(53 187 255 / 1)',
          // border: 'rgb(var(--color-border) / 1)',
        },
        success: {
          50: 'rgb(6 241 154 / 0.1)',
          900: 'rgb(6 241 154 / 1)',
          DEFAULT: 'rgb(6 241 154 / 1)',
        },
        warning: 'rgb(254 147 31)',
        error: 'rgb(234 38 40)',
      },
      spacing: {
      },
      fontSize: {
        '2xs': '10px',
        xs: '12px',
        sm: '14px',
        md: '16px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '30px',
        '5xl': '36px',
        '6xl': '48px',
        '7xl': '60px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen md': {
            maxWidth: '100%',
          },
          '@screen lg': {
            maxWidth: '100%',
          },
          '@screen xl': {
            maxWidth: '100%',
          },
        }
      })
    }
  ],
}
