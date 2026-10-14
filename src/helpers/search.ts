import { PostSummary } from '../types'
import { StampMeta } from './stamp'

const terms = (query: string) => query.toLowerCase().split(/\s+/).filter(Boolean)

const matches = (words: string[], fields: (string | undefined)[]) => {
  const haystack = fields.filter(Boolean).join(' ').toLowerCase()
  return words.length > 0 && words.every(word => haystack.includes(word))
}

export const searchSite = (query: string, posts: PostSummary[], projects: StampMeta[]) => {
  const words = terms(query)
  return {
    posts: posts.filter(post => matches(words, [post.title, post.description])),
    projects: projects.filter(project => matches(words, [project.name, project.blurb, project.lang, project.tag]))
  }
}
