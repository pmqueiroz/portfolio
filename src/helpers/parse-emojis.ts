import { nameToEmoji } from 'gemoji'
import { snakeCase } from 'lodash'

const emojiLike = /(:[\w-]+:)/gm

const githubAliases: Record<string, string> = {
  shipit: '🐿️'
}

export const parseEmojis = (text: string) => {
  return text.replace(emojiLike, match => {
    const name = snakeCase(match || '')
    return nameToEmoji[name] ?? githubAliases[name] ?? match
  })
}
