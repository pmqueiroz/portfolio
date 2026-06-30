import { toRem } from '../helpers'

export const theme = {
  colors: {
    // paper & ink
    base: '#f1ede3',
    card: '#faf8f1',
    dark: '#17150f',
    darkHover: '#000000',
    // muted tones
    muted: '#8b8473',
    subtext: '#6a6457',
    // rules & shadows
    line: '#cfc6b2',
    lineStrong: '#c9c0ad',
    shadow: '#9c9279',
    shadowSoft: '#c9c0ad',
    selection: '#dcd3bd',
    highlight: '#dcd3bd',
    // legacy keys kept for compatibility
    gray: '#8b8473',
    lightGray: '#e3ddcc',
    darkGray: '#9c9279',
    red: '#7c2d2a',
    orange: '#6b5a1f',
    blue: '#33396b',
    green: '#1f5c54',
    orangeLight: '#f8961e60'
  },
  global: {
    sizes: {
      navigationHeight: toRem(72),
      maxWidth: '1200px'
    },
    breakpoints: {
      mobile: 1000
    }
  }
}
