'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'pmq_visited'

export const useVisited = () => {
  const [visited, setVisited] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || '[]') as string[]
      const map: Record<string, boolean> = {}
      stored.forEach(k => { map[k] = true })
      setVisited(map)
    } catch (e) { /* ignore */ }
  }, [])

  const isVisited = useCallback((name: string) => Boolean(visited[name]), [visited])

  const markVisited = useCallback((name: string) => {
    setVisited(prev => {
      if (prev[name]) return prev
      const next = { ...prev, [name]: true }
      try { localStorage.setItem(KEY, JSON.stringify(Object.keys(next))) } catch (e) { /* ignore */ }
      return next
    })
  }, [])

  return { isVisited, markVisited }
}
