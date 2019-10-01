const gray = require('gray-percentage');
const { MOBILE_MEDIA_QUERY } = require('typography-breakpoint-constants');
const verticalRhythm = require('compass-vertical-rhythm');

const theme = {
  title: 'Baskerville',
  baseFontSize: '20px',
  baseLineHeight: 1.5,
  blockMarginBottom: 0.8,
  googleFonts: [
    {
      name: 'Libre Baskerville',
      styles: ['700'],
    },
    {
      name: 'Lato',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
  headerFontFamily: ['Libre Baskerville', 'Georgia', 'Times New Roman', 'Times', 'serif'],
  bodyFontFamily: ['Lato', 'sans-serif'],
  bodyColor: gray(30),
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
    let linkColor = '#222';
    return {
      'h1,h2,h3,h4,h5,h6': {
        color: gray(20),
        marginTop: rhythm(2),
        marginBottom: rhythm(1),
      },
      a: {
        color: linkColor,
        textDecoration: 'none',
        textShadow:
          '.03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff', // eslint-disable-line
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
      },
      'a:hover,a:active': {
        textShadow: 'none',
        backgroundImage: 'none',
      },
      blockquote: {
        ...scale(1 / 5),
        color: gray(41),
        fontStyle: 'italic',
        paddingLeft: rhythm(13 / 16),
        marginLeft: 0,
        borderLeft: `${rhythm(3 / 16)} solid ${gray(30)}`,
      },
      'blockquote > :last-child': {
        marginBottom: 0,
      },
      'blockquote cite': {
        ...adjustFontSizeTo(options.baseFontSize),
        color: options.bodyColor,
        fontWeight: options.bodyWeight,
      },
      'blockquote cite:before': {
        content: '"— "',
      },
      [MOBILE_MEDIA_QUERY]: {
        html: {
          fontSize: `${16 / 16 * 100}%`,
        },
        blockquote: {
          marginLeft: '-1rem',
          marginRight: 0,
          paddingLeft: rhythm(9 / 16),
          borderLeft: `${rhythm(1 / 16)} solid ${gray(30)}`
        },
      },
    }
  }
}

module.exports = { theme }
