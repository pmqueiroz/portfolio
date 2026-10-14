'use client'

import { PointerEvent, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { theme } from '../styles/theme'

export interface Point {
   x: number
   y: number
}

const margin = 16
const wideQuery = `(min-width: ${theme.global.breakpoints.narrow}px)`

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

let remembered: Point | null = null

export const forgetWindowPosition = () => {
  remembered = null
}

const room = (frame: HTMLElement) => ({
  x: Math.max(0, window.innerWidth - frame.offsetWidth - margin * 2),
  y: Math.max(0, window.innerHeight - frame.offsetHeight - margin * 2)
})

const clamp = (point: Point, frame: HTMLElement): Point => {
  const { x, y } = room(frame)
  return {
    x: Math.round(Math.min(Math.max(point.x, margin), margin + x)),
    y: Math.round(Math.min(Math.max(point.y, margin), margin + y))
  }
}

const randomPoint = (frame: HTMLElement): Point => {
  const { x, y } = room(frame)
  return { x: margin + Math.random() * x, y: margin + Math.random() * y }
}

export const useWindowPosition = (frame: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<Point | null>(null)
  const grab = useRef<Point | null>(null)

  const place = useCallback((point: Point | null) => {
    remembered = point
    setPosition(point)
  }, [])

  useIsomorphicLayoutEffect(() => {
    const el = frame.current
    if (!el) return

    const wide = window.matchMedia(wideQuery)
    const settle = () => {
      if (!wide.matches) return setPosition(null)
      place(clamp(remembered ?? randomPoint(el), el))
    }

    settle()
    const observer = new ResizeObserver(settle)
    observer.observe(el)
    window.addEventListener('resize', settle)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', settle)
    }
  }, [frame, place])

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!position || e.button !== 0 || (e.target as HTMLElement).closest('button')) return
    grab.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!grab.current || !frame.current) return
    place(clamp({ x: e.clientX - grab.current.x, y: e.clientY - grab.current.y }, frame.current))
  }

  const release = () => {
    grab.current = null
  }

  return {
    position,
    dragHandlers: { onPointerDown, onPointerMove, onPointerUp: release, onPointerCancel: release }
  }
}
