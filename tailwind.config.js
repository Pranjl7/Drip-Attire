const { transform } = require('zod');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,ejs}",
    "./public/**/*.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        Authform : {
          bgwhite : "#f5f5f5",
          button : "#5533ea"
        },
      },
      fontFamily: {
        geist : ['Geist', 'sans-serif'],
        roboto : ['Roboto', 'sans-serif']
      },
      keyframes: {
        scrollLeft: {
          '0%' : {transform : 'translateX(-50%)'},
          '100%' : {transform : 'translateX(0%)'},
        },
      },
      animation: {
        'scroll-left': 'scrollLeft 25s linear infinite',
      },
    },
  },
  plugins: [],
}