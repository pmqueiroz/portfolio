import { Fragment } from 'react'
import { emojiPattern, emojiSrc } from '../../helpers/emoji'

export const Emojify = ({ text }: { text: string }) => {
  const parts: (string | { emoji: string; src: string })[] = []
  let last = 0

  for (const match of Array.from(text.matchAll(emojiPattern()))) {
    const src = emojiSrc(match[0])
    if (!src) continue
    parts.push(text.slice(last, match.index), { emoji: match[0], src })
    last = (match.index ?? 0) + match[0].length
  }
  parts.push(text.slice(last))

  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string'
          ? <Fragment key={i}>{part}</Fragment>
          : <img key={i} className="emoji" src={part.src} alt={part.emoji} draggable={false} />
      )}
    </>
  )
}
