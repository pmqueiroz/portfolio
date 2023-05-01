import { nameToEmoji } from 'gemoji'
import { snakeCase } from 'lodash'

const emojiLike = /(:[\w-]+:)/gm

export const parseEmojis = (text: string) => {
    return text.replace(emojiLike, match => {
        return nameToEmoji[snakeCase(match || '')] ?? match
    })
}
