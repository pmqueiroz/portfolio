import fs from 'fs'
import path from 'path'

import { Post, PostSummary } from '../types'
import { parseMarkdown } from '../helpers/parse-markdown'
import { readTime } from '../helpers/read-time'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

interface Chapter {
  name: string
  content: string
}

const stripQuotes = (value: string) =>
  value.replace(/^['"]|['"]$/g, '')

const parseFrontmatter = (raw: string): { meta: Record<string, string>; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)

  if (!match) {
    return { meta: {}, body: raw }
  }

  const meta: Record<string, string> = {}
  match[1].split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const value = stripQuotes(line.slice(idx + 1).trim())
    if (key) meta[key] = value
  })

  return { meta, body: match[2] }
}

const splitChapters = (body: string): Chapter[] => {
  const lines = body.split(/\r?\n/)
  const chapters: { name: string; lines: string[] }[] = []
  const preamble: string[] = []
  let current: { name: string; lines: string[] } | null = null
  let inFence = false

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence

    const heading = !inFence && /^##\s+(.+?)\s*$/.exec(line)
    if (heading) {
      if (current) chapters.push(current)
      current = { name: heading[1], lines: [] }
    } else if (current) {
      current.lines.push(line)
    } else {
      preamble.push(line)
    }
  }

  if (current) chapters.push(current)

  const result: Chapter[] = chapters.map(c => ({
    name: c.name,
    content: c.lines.join('\n').trim()
  }))

  const intro = preamble.join('\n').trim()
  if (intro) {
    result.unshift({ name: 'Introduction', content: intro })
  }

  return result
}

const listSlugs = (): string[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

const readRawPost = (slug: string): { post: Post; raw: Chapter[] } | undefined => {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return

  const { meta, body } = parseFrontmatter(fs.readFileSync(file, 'utf-8'))
  const chapters = splitChapters(body)

  return {
    raw: chapters,
    post: {
      slug,
      title: meta.title ?? slug,
      description: meta.description ?? '',
      draft: meta.draft === 'true',
      chapters
    }
  }
}

export const getAllSlugs = (): string[] => listSlugs()

export const getPosts = async (): Promise<Post[]> => {
  return listSlugs()
    .map(slug => readRawPost(slug)?.post)
    .filter((p): p is Post => Boolean(p))
}

export const getPostBySlug = async ({ slug }: { slug: string }): Promise<Post | undefined> => {
  const entry = readRawPost(slug)
  if (!entry) return

  const chapters = await Promise.all(
    entry.raw.map(async ({ name, content }) => ({
      name,
      content: await parseMarkdown(content)
    }))
  )

  return { ...entry.post, chapters }
}

export const getPostSummaries = async (): Promise<PostSummary[]> => {
  const posts = await getPosts()
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    draft: post.draft,
    minutes: readTime(post)
  }))
}
