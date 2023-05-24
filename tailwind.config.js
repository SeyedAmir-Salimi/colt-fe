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
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      west: ['Nashville', 'Arial']
    },
    extend: {
      backgroundImage: {
        allCha02: 'url(assets/allCha02.jpeg)',
        Belle: 'url(assets/belle.png)',
        BelleWanted: 'url(assets/belle-p.jpg)',
        briefCase: 'url(assets/briefCase.png)',
        Cheyenne: 'url(assets/cheyenne.png)',
        CheyenneWanted: 'url(assets/cheyenne-p.jpg)',
        coltExpress: 'url(assets/colt-express.jpg)',
        DesertSym: 'url(assets/desert-sym.png)',
        Django: 'url(assets/django.png)',
        DjangoWanted: 'url(assets/django-p.jpg)',
        Doc: 'url(assets/doc.png)',
        DocWanted: 'url(assets/doc-p.jpg)',
        gem: 'url(assets/gem.png)',
        Ghost: 'url(assets/ghost.png)',
        GhostWanted: 'url(assets/ghost-p.jpg)',
        monyBag: 'url(assets/monyBag.png)',
        Sherif: 'url(assets/sherif.png)',
        TrainWest: 'url(assets/west-back.jpg)',
        TrainWestTunnel: 'url(assets/west-back-tunnel.jpg)',
        Tuco: 'url(assets/tuco.png)',
        TucoWanted: 'url(assets/tuco-p.jpg)',
        TunnelSym: 'url(assets/tunnel-sym.png)',
        wantedCard: 'url(assets/wanted-card.svg)',
        spritSpinner: 'url(assets/sprit.gif)'
      },
      colors: {
        viola: '#5c45c3',
        red: '#ff5252',
        midGrey: '#eaeaea',
        lightGrey: '#f4f4f4',
        darkGrey: '#dddddd',
        lemonGreen: '#e8ff63',
        slate: '#18385c',
        orange: '#fa9639',
        ghostWhite: '#ede3cf',
        cheyenneGreen: '#3bdf1a',
        dJangoGray: '#aaa4a4',
        belleViolet: '#b910c2',
        tucoRed: '#e10f0a',
        docBlue: '#54e3ce'
      }
    }
  },
  plugins: []
};
