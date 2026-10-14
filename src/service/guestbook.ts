import { Redis } from '@upstash/redis'

import { GuestbookDraft, GuestbookEntry } from '../types'

export const guestbookKeys = {
  entries: 'guestbook:entries',
  pending: 'guestbook:pending',
  approved: 'guestbook:approved',
  signings: (visitor: string) => `guestbook:signings:${visitor}`
}

export const guestbookLimits = { name: 40, message: 500, website: 100, shown: 100, signingsPerHour: 3 }

const configured = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
  (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)
)

const redis = configured ? Redis.fromEnv() : null

export const guestbookAvailable = () => redis !== null

export const listApproved = async (): Promise<GuestbookEntry[]> => {
  if (!redis) return []
  const ids = await redis.zrange<string[]>(guestbookKeys.approved, 0, guestbookLimits.shown - 1, { rev: true })
  if (ids.length === 0) return []
  const entries = await redis.hmget<Record<string, GuestbookEntry>>(guestbookKeys.entries, ...ids)
  return entries ? ids.map(id => entries[id]).filter(Boolean) : []
}

export const allowSigning = async (visitor: string) => {
  if (!redis) return false
  const key = guestbookKeys.signings(visitor)
  const [count] = await redis.pipeline().incr(key).expire(key, 3600, 'NX').exec<[number, number]>()
  return count <= guestbookLimits.signingsPerHour
}

export const addPending = async (draft: GuestbookDraft) => {
  if (!redis) throw new Error('guestbook storage is not configured')
  const entry: GuestbookEntry = { id: crypto.randomUUID(), createdAt: Date.now(), ...draft }
  await redis.hset(guestbookKeys.entries, { [entry.id]: entry })
  await redis.zadd(guestbookKeys.pending, { score: entry.createdAt, member: entry.id })
  return entry
}

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : ''

const cleanMessage = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim() : ''

const isWebAddress = (value: string) => {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

export const parseDraft = (body: unknown): GuestbookDraft | string => {
  const input = (body ?? {}) as Record<string, unknown>
  const name = clean(input.name, guestbookLimits.name)
  const message = cleanMessage(input.message)
  const website = clean(input.website, guestbookLimits.website)

  if (!name) return 'Please tell me your name.'
  if (!message) return 'The message is empty.'
  if (message.length > guestbookLimits.message) return `Keep it under ${guestbookLimits.message} characters.`
  if (website && !isWebAddress(website)) return 'Homepage must start with http:// or https://'

  return website ? { name, message, website } : { name, message }
}
