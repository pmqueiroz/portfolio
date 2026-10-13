import { Post } from '../types'

export const readTime = (post: Post) => {
  const words = post.chapters
    .map(c => c.content)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
