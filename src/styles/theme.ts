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
    orangeLight: '#f8961e60',
    desktop: '#3a7f99',
    alarm: '#a8231c',
    sun: '#ffe45c',
    highlighter: '#fff200',
    sky: '#d6ecff',
    navy: '#1c2a7a',
    outset: '#dddddd'
  },
  gradients: {
    panel: 'linear-gradient(90deg, #1c2a7a, #3a8fb7)',
    window: 'linear-gradient(90deg, #0a246a, #a6caf0)',
    header: 'linear-gradient(180deg, #fff6b8, #ffd24a)',
    footer: 'linear-gradient(180deg, #d6ecff, #a6caf0)',
    ad: 'linear-gradient(90deg, #0a246a, #2f6fd0)',
    wordArt: 'linear-gradient(180deg, #fff 0%, #9fd3ff 35%, #1c4fb8 52%, #0a246a 100%)'
  },
  fonts: {
    mono: 'var(--font-jetbrains-mono), monospace',
    type: 'var(--font-cutive-mono), monospace'
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
