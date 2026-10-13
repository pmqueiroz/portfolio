import { toRem } from '../helpers'

export const theme = {
  colors: {
    base: '#f1ede3',
    card: '#faf8f1',
    paper: '#ffffff',
    dark: '#17150f',
    darkHover: '#000000',
    muted: '#8b8473',
    subtext: '#6a6457',
    line: '#cfc6b2',
    lineStrong: '#c9c0ad',
    dashed: '#c4baa3',
    shadow: '#9c9279',
    shadowSoft: '#c9c0ad',
    selection: '#dcd3bd',
    highlight: '#dcd3bd',
    bevel: '#e3ddcc',
    titleBar: '#33396b',
    backdrop: '#17150f33',
    counter: '#e8dcaf',
    link: '#33396b',
    linkVisited: '#5a2f57',
    gray: '#8b8473',
    lightGray: '#e3ddcc',
    darkGray: '#9c9279',
    red: '#7c2d2a',
    orange: '#6b5a1f',
    blue: '#33396b',
    green: '#1f5c54',
    orangeLight: '#f8961e60'
  },
  fonts: {
    mono: 'var(--font-jetbrains-mono), var(--font-noto-emoji), monospace',
    type: 'var(--font-cutive-mono), var(--font-noto-emoji), monospace'
  },
  global: {
    sizes: {
      navigationHeight: toRem(72),
      maxWidth: '1200px',
      pageWidth: '780px',
      windowWidth: '720px'
    },
    breakpoints: {
      mobile: 1000,
      narrow: 640
    }
  }
}
