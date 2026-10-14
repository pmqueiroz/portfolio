import { addPending, allowSigning, guestbookAvailable, listApproved, parseDraft } from '../../../service/guestbook'

export const dynamic = 'force-dynamic'

const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'CDN-Cache-Control': 'no-store'
}

const reply = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers })

const visitorOf = (request: Request) =>
  request.headers.get('cf-connecting-ip') ??
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
  'unknown'

export async function GET() {
  if (!guestbookAvailable()) return reply({ error: 'The guestbook is offline.' }, 503)
  return reply({ entries: await listApproved() })
}

export async function POST(request: Request) {
  if (!guestbookAvailable()) return reply({ error: 'The guestbook is offline.' }, 503)

  const body = await request.json().catch(() => null)
  if (body?.homepage) return reply({ status: 'pending' }, 202)

  const draft = parseDraft(body)
  if (typeof draft === 'string') return reply({ error: draft }, 400)

  if (!(await allowSigning(visitorOf(request)))) {
    return reply({ error: 'Slow down — try again in an hour.' }, 429)
  }

  await addPending(draft)
  return reply({ status: 'pending' }, 202)
}
