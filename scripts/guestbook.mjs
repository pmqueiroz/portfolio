import { Redis } from '@upstash/redis'

const keys = {
  entries: 'guestbook:entries',
  pending: 'guestbook:pending',
  approved: 'guestbook:approved'
}

const redis = Redis.fromEnv()

const usage = `usage: pnpm guestbook <command> [id...]

  pending          list entries waiting for approval
  approved         list published entries
  approve <id...>  publish pending entries
  reject <id...>   delete pending entries
  remove <id...>   unpublish and delete published entries`

const show = async key => {
  const ids = await redis.zrange(key, 0, -1)
  if (ids.length === 0) return console.log('(none)')
  const entries = await redis.hmget(keys.entries, ...ids)
  for (const id of ids) {
    const entry = entries?.[id]
    if (!entry) continue
    console.log(`\n${id}  ${new Date(entry.createdAt).toISOString()}`)
    console.log(`  ${entry.name}${entry.website ? `  <${entry.website}>` : ''}`)
    console.log(entry.message.split('\n').map(line => `  | ${line}`).join('\n'))
  }
}

const requireIds = ids => {
  if (ids.length === 0) {
    console.error(usage)
    process.exit(1)
  }
}

const move = async ids => {
  for (const id of ids) {
    const score = await redis.zscore(keys.pending, id)
    if (score === null) {
      console.log(`skip ${id}: not pending`)
      continue
    }
    await redis.zadd(keys.approved, { score, member: id })
    await redis.zrem(keys.pending, id)
    console.log(`approved ${id}`)
  }
}

const drop = async (from, ids) => {
  for (const id of ids) {
    const removed = await redis.zrem(from, id)
    if (!removed) {
      console.log(`skip ${id}: not in ${from}`)
      continue
    }
    await redis.hdel(keys.entries, id)
    console.log(`deleted ${id}`)
  }
}

const [command, ...ids] = process.argv.slice(2)

switch (command) {
  case 'pending':
    await show(keys.pending)
    break
  case 'approved':
    await show(keys.approved)
    break
  case 'approve':
    requireIds(ids)
    await move(ids)
    break
  case 'reject':
    requireIds(ids)
    await drop(keys.pending, ids)
    break
  case 'remove':
    requireIds(ids)
    await drop(keys.approved, ids)
    break
  default:
    console.log(usage)
}
