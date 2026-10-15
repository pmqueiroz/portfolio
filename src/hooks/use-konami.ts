'use client'

import { useEffect, useRef } from 'react'

const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

export const useKonami = (onUnlock: () => void) => {
  const progress = useRef(0)
  const callback = useRef(onUnlock)
  callback.current = onUnlock

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === sequence[progress.current]) progress.current++
      else progress.current = key === sequence[0] ? 1 : 0
      if (progress.current === sequence.length) {
        progress.current = 0
        callback.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
