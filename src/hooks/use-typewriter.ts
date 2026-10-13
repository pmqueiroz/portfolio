'use client'

import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useTypeOnce = (text: string, delay = 105) => {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (prefersReducedMotion()) return setTyped(text)

    let i = 0
    const timer = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, delay)

    return () => clearInterval(timer)
  }, [text, delay])

  return typed
}

export const useTypeLoop = (words: string[], delay = 62, holdTyped = 27, holdDeleted = 6) => {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (prefersReducedMotion()) return setTyped(words[0])

    let word = 0
    let chars = 0
    let dir = 1
    let hold = 0

    const timer = setInterval(() => {
      if (hold > 0) {
        hold--
        return
      }
      chars += dir
      if (chars >= words[word].length) {
        dir = -1
        hold = holdTyped
      } else if (chars <= 0) {
        dir = 1
        hold = holdDeleted
      }
      setTyped(words[word].slice(0, chars))
      if (chars <= 0) word = (word + 1) % words.length
    }, delay)

    return () => clearInterval(timer)
  }, [words, delay, holdTyped, holdDeleted])

  return typed
}
