import { useMutation, useQuery, useQueryClient } from 'react-query'

import { GuestbookDraft, GuestbookEntry } from '../types'

const endpoint = '/api/guestbook'

const request = async <T>(init?: RequestInit): Promise<T> => {
  const response = await fetch(endpoint, { cache: 'no-store', ...init })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error ?? 'The guestbook is not answering.')
  return body
}

export const useGuestbook = () => {
  const queryClient = useQueryClient()

  const entries = useQuery(['guestbook'], () => request<{ entries: GuestbookEntry[] }>(), {
    retry: false,
    refetchOnWindowFocus: false
  })

  const sign = useMutation((draft: GuestbookDraft & { homepage?: string }) =>
    request<{ status: string }>({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft)
    }), {
    onSuccess: () => queryClient.invalidateQueries(['guestbook'])
  })

  return { entries: entries.data?.entries ?? [], entriesError: entries.error as Error | null, isLoading: entries.isLoading, sign }
}
