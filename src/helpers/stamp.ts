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
  TypeScript: { ink: '#008080', ground: '#c0c0c0' },
  JavaScript: { ink: '#808000', ground: '#c0c0c0' },
  Go: { ink: '#000080', ground: '#c0c0c0' },
  Python: { ink: '#800080', ground: '#c0c0c0' },
  Lua: { ink: '#000080', ground: '#c0c0c0' },
  EJS: { ink: '#800000', ground: '#c0c0c0' }
}

const defaultPalette = { ink: '#800000', ground: '#c0c0c0' }

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
