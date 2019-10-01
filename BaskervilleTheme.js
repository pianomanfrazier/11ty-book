const gray = require('gray-percentage');
const { MOBILE_MEDIA_QUERY } = require('typography-breakpoint-constants');
const verticalRhythm = require('compass-vertical-rhythm');

const theme = {
  title: 'Baskerville',
  baseFontSize: '20px',
  baseLineHeight: 1.5,
  blockMarginBottom: 1,
  googleFonts: [
    {
      name: 'Roboto Slab',
      styles: ['700'],
    },
    {
      name: 'Roboto',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
  headerFontFamily: ['Roboto Slab', 'Georgia', 'Times New Roman', 'Times', 'serif'],
  bodyFontFamily: ['Roboto', 'sans-serif'],
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
      'h1': {
        marginTop: rhythm(4),
        marginBottom: rhythm(3),
      },
      'h2': {
        marginTop: rhythm(3),
        marginBottom: rhythm(2),
      },
      a: {
        color: linkColor,
        textDecoration: 'none',
        borderBottom: '3px solid rgba(255, 178, 112, 0.5)',
      },
      'a:hover,a:active': {
        background: 'rgba(255, 178, 112, 0.5)',
        backgroundColor: 'rgba(255, 178, 112, 0.5)',
        // borderBottom: 'none'
      },
      blockquote: {
        ...scale(1 / 5),
        color: gray(41),
        fontStyle: 'italic',
        paddingLeft: rhythm(13 / 16),
        marginLeft: 0,
        borderLeft: `${rhythm(3 / 16)} solid #ff6d7e`,
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
          fontSize: `${17 / 16 * 100}%`,
        },
        blockquote: {
          marginLeft: '-1rem',
          marginRight: 0,
          paddingLeft: rhythm(9 / 16),
          borderLeft: `${rhythm(1 / 16)} solid #ff6d7e`
        },
      },
    }
  }
}

module.exports = { theme }
