'use client'

import { useEffect, useState } from 'react'

const KEY = 'pmq_reading'

export const useReadingMode = () => {
  const [reading, setReading] = useState(false)

  useEffect(() => {
    try {
      setReading(localStorage.getItem(KEY) === '1')
    } catch (e) {
      return
    }
  }, [])

  const toggleReading = () => {
    const next = !reading
    setReading(next)
    try {
      localStorage.setItem(KEY, next ? '1' : '0')
    } catch (e) {
      return
    }
  }

  return { reading, toggleReading }
}
