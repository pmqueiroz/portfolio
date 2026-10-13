import { GHRepo } from '../types'
import { parseEmojis } from './parse-emojis'

export interface StampMeta {
  name: string
  denom: string
  glyph: string
  tag: string
  year: string
  lang: string
  blurb: string
  ink: string
  ground: string
}

const languagePalette: Record<string, { ink: string; ground: string }> = {
  TypeScript: { ink: '#1f5c54', ground: '#cfe0d6' },
  JavaScript: { ink: '#6b5a1f', ground: '#e8dcaf' },
  Go: { ink: '#33396b', ground: '#d2d5e6' },
  Python: { ink: '#5a2f57', ground: '#e1cfdd' },
  Lua: { ink: '#33396b', ground: '#d2d5e6' },
  EJS: { ink: '#7c2d2a', ground: '#e7cdb6' }
}

const defaultPalette = { ink: '#7c2d2a', ground: '#e7cdb6' }

const mintInk = '#17150f'
const mintGround = '#e8e2d3'
const mintPattern = 'repeating-linear-gradient(135deg,#d8d0bd 0 2px,#e8e2d3 2px 7px)'
const canceledPattern = (ink: string) =>
  `repeating-linear-gradient(135deg,${ink}24 0 1.5px,transparent 1.5px 6px)`

export interface StampFace {
  status: 'MINT' | 'CANCELED'
  ink: string
  ground: string
  pattern: string
}

export const stampFace = (meta: StampMeta, visited: boolean): StampFace =>
  visited
    ? { status: 'CANCELED', ink: meta.ink, ground: meta.ground, pattern: canceledPattern(meta.ink) }
    : { status: 'MINT', ink: mintInk, ground: mintGround, pattern: mintPattern }

const glyphs = ['{ }', '¶', '~/', ':)', 'Aa', '▤', '/*', '<>', '#!', '=>', '::', '%']

const hash = (s: string) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const twoDigitYear = (repo: GHRepo) => {
  const raw = repo.pushed_at ?? repo.created_at
  const d = raw ? new Date(raw) : null
  if (!d || isNaN(d.getTime())) return '00'
  return String(d.getFullYear()).slice(-2)
}

const tagFor = (repo: GHRepo) => {
  const topic = repo.topics?.find(t => t !== 'portfolio-visible')
  return topic ?? (repo.language ? repo.language.toLowerCase() : 'project')
}

export const stampMeta = (repo: GHRepo, index: number): StampMeta => {
  const palette = (repo.language && languagePalette[repo.language]) || defaultPalette

  return {
    name: repo.name,
    denom: `${String.fromCharCode(65 + (index % 26))}${index + 1}`,
    glyph: glyphs[hash(repo.name) % glyphs.length],
    tag: tagFor(repo),
    year: twoDigitYear(repo),
    lang: repo.language?.toUpperCase() ?? '—',
    blurb: repo.description ? parseEmojis(repo.description) : '(no description)',
    ink: palette.ink,
    ground: palette.ground
  }
}
