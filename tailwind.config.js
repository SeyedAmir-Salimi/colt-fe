/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xl: '3840px'
    },
    extend: {
      backgroundImage:{
        "allCha01": 'url(assets/allCha01.png)',
        "allCha02": 'url(assets/allCha02.jpeg)',
        "back-w": 'url(assets/back-w.jpg)',
        "coltExpress": 'url(assets/colt-express.jpg)',
        "Belle": 'url(assets/belle.png)',
        "Cheyenne": 'url(assets/cheyenne.png)',
        "Django": 'url(assets/django.png)',
        "Doc": 'url(assets/doc.png)',
        "Ghost": 'url(assets/ghost.png)',
        "Tuco": 'url(assets/tuco.png)',
      },
      colors: {
        viola: '#5c45c3',
        red: '#ff5252',
        midGrey: '#eaeaea',
        lightGrey: '#f4f4f4',
        darkGrey: '#dddddd',
        lemonGreen: '#e8ff63',
        slate: '#18385c',
        orange: '#fa9639'
      }
    }
  },
  plugins: []
};
