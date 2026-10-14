import { toRem } from '../helpers'

export const theme = {
  colors: {
    base: '#c0c0c0',
    card: '#ffffff',
    paper: '#ffffff',
    dark: '#000000',
    darkHover: '#000000',
    muted: '#808080',
    subtext: '#404040',
    line: '#a0a0a0',
    lineStrong: '#808080',
    dashed: '#808080',
    shadow: '#808080',
    shadowSoft: '#a0a0a0',
    selection: '#000080',
    highlight: '#ffff99',
    bevel: '#c0c0c0',
    backdrop: '#00000033',
    counter: '#00ff00',
    link: '#0000ee',
    linkVisited: '#551a8b',
    gray: '#808080',
    lightGray: '#dfdfdf',
    darkGray: '#808080',
    red: '#800000',
    orange: '#806000',
    blue: '#000080',
    green: '#008000',
    orangeLight: '#f8961e60',
    desktop: '#008080',
    alarm: '#a8231c',
    sun: '#ffe45c',
    highlighter: '#fff200',
    sky: '#d6ecff',
    navy: '#000080',
    outset: '#dfdfdf'
  },
  gradients: {
    panel: 'linear-gradient(90deg, #000080, #1084d0)',
    window: 'linear-gradient(90deg, #000080, #1084d0)',
    header: 'linear-gradient(180deg, #fff6b8, #ffd24a)',
    footer: 'linear-gradient(180deg, #d6ecff, #a6caf0)',
    ad: 'linear-gradient(90deg, #000080, #1084d0)',
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
