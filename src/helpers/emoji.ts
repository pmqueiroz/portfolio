import manifest from './emoji-manifest.json'

const available = new Set<string>(manifest)

const presented = '(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic}\\uFE0F)\\p{Emoji_Modifier}?'
const joined = '(?:\\u200D\\p{Extended_Pictographic}\\uFE0F?\\p{Emoji_Modifier}?)*'
const flag = '\\p{Regional_Indicator}{2}'
const keycap = '[#*0-9]\\uFE0F?\\u20E3'

export const emojiPattern = () => new RegExp(`${flag}|${keycap}|${presented}${joined}`, 'gu')

const fileName = (codepoints: number[]) =>
  codepoints.map(cp => `U+${cp.toString(16).toUpperCase()}`).join('_')

const isModifier = (cp: number) => cp >= 0x1f3fb && cp <= 0x1f3ff

export const emojiSrc = (emoji: string) => {
  const codepoints = Array.from(emoji, ch => ch.codePointAt(0) as number).filter(cp => cp !== 0xfe0f)
  const candidates = [codepoints, codepoints.filter(cp => !isModifier(cp))]
  const match = candidates.map(fileName).find(name => available.has(name))
  return match ? `/emoji/${match}.png` : undefined
}

const escapeAttribute = (value: string) => value.replace(/"/g, '&quot;')

export const emojiImg = (emoji: string) => {
  const src = emojiSrc(emoji)
  return src ? `<img class="emoji" src="${src}" alt="${escapeAttribute(emoji)}" draggable="false">` : emoji
}

const tag = /(<[^>]*>)/
const rawBlock = /^<(\/?)(pre|code|script|style|textarea)\b/i

export const emojifyHtml = (html: string) => {
  let rawDepth = 0
  return html
    .split(tag)
    .map(part => {
      if (part.startsWith('<')) {
        const raw = rawBlock.exec(part)
        if (raw) rawDepth = Math.max(0, rawDepth + (raw[1] ? -1 : 1))
        return part
      }
      return rawDepth > 0 ? part : part.replace(emojiPattern(), emojiImg)
    })
    .join('')
}
