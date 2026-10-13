'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'pmq_visited'

let visited: Record<string, boolean> | null = null
const listeners = new Set<() => void>()
const empty: Record<string, boolean> = {}

const read = () => {
  if (visited) return visited
  visited = {}
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '[]') as string[]
    visited = Object.fromEntries(stored.map(k => [k, true]))
  } catch (e) {
    return visited
  }
  return visited
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export const useVisited = () => {
  const [map, setMap] = useState(empty)

  useEffect(() => {
    const sync = () => setMap(read())
    sync()
    return subscribe(sync)
  }, [])

  const isVisited = useCallback((name: string) => Boolean(map[name]), [map])

  const markVisited = useCallback((name: string) => {
    const current = read()
    if (current[name]) return
    visited = { ...current, [name]: true }
    listeners.forEach(l => l())
    try {
      localStorage.setItem(KEY, JSON.stringify(Object.keys(visited)))
    } catch (e) {
      return
    }
  }, [])

  return { isVisited, markVisited }
}
