const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './app/**/*.php',
      './resources/**/*.{php,vue,js}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      lineHeight: '1.0',
      fontFamily: {
        sans: ['Libre Franklin', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
            css: {
            maxWidth: 'unset',
            },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addComponents }) {
      const mayusculas = {
        '.mayusculas': {
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: '700',
        }
      }
      const boton = {
        '.boton': {
          borderWidth: '5px',
          borderColor: '#000',
          paddingTop: '0.5em',
          paddingBottom: '0.5em',
          paddingRight: '0.8em',
          paddingLeft: '0.8em',
        }
      }
      addComponents([mayusculas, boton])
    })
  ],
};
