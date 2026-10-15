'use client'

import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const sparkles = ['✦', '✧', '★', '·', '✶']
const colours = ['#ff00ff', '#00ffff', '#ffff00', '#ff8000', '#00ff00']
const lifetime = 700
const spacing = 14

const Layer = styled.div`
   position: fixed;
   inset: 0;
   z-index: 90;
   pointer-events: none;
   overflow: hidden;

   span {
      position: absolute;
      font-size: 14px;
      line-height: 1;
      animation: sparkle-fall ${lifetime}ms ease-out forwards;
   }

   @keyframes sparkle-fall {
      from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      to { opacity: 0; transform: translate(-50%, 40%) scale(0.4); }
   }
`

const canSparkle = () =>
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const CursorTrail = () => {
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canSparkle()) return
    let last = { x: -100, y: -100 }
    let count = 0

    const onMove = (e: PointerEvent) => {
      const host = layer.current
      if (!host || Math.hypot(e.clientX - last.x, e.clientY - last.y) < spacing) return
      last = { x: e.clientX, y: e.clientY }
      const dot = document.createElement('span')
      dot.textContent = sparkles[count % sparkles.length]
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      dot.style.color = colours[count % colours.length]
      count++
      host.appendChild(dot)
      setTimeout(() => dot.remove(), lifetime)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <Layer ref={layer} aria-hidden="true" />
}
