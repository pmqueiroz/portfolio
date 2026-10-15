'use client'

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { sunken } from '../../styles/bevel'
import { LedCounter } from '../led-counter'

const width = 640
const height = 320
const heli = { x: 110, w: 34, h: 16 }
const physics = { gravity: 0.24, lift: -0.42, maxFall: 5, maxRise: -4.5 }
const pace = { start: 2, extra: 2, rampOver: 6000 }
const tickMs = 1000 / 60
const maxCatchUp = 5
const cave = { slice: 8, minGap: 150, startGap: 230, drift: 14, shrinkEvery: 600 }
const block = { w: 22, h: 70, every: 260 }
const ink = { wall: '#00c000', bg: '#000000', heli: '#ffffff', block: '#00c000', smoke: '#808080' }
const bestKey = 'pmq_helicopter_best'

type Phase = 'ready' | 'flying' | 'crashed'

interface Slice { top: number; bottom: number }
interface Block { x: number; y: number }

const Wrap = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   max-width: ${width}px;
`

const Screen = styled.canvas`
   display: block;
   width: 100%;
   height: auto;
   aspect-ratio: ${width} / ${height};
   ${sunken}
   border-width: 2px;
   background: ${ink.bg};
   touch-action: none;
   cursor: pointer;
`

const Scores = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   font-size: 12px;
`

const readBest = () => {
  try {
    return Number(localStorage.getItem(bestKey)) || 0
  } catch (e) {
    return 0
  }
}

const saveBest = (value: number) => {
  try {
    localStorage.setItem(bestKey, String(value))
  } catch (e) {
    return
  }
}

const freshWorld = () => {
  const slices: Slice[] = []
  const margin = (height - cave.startGap) / 2
  for (let x = 0; x <= width + cave.slice; x += cave.slice) slices.push({ top: margin, bottom: height - margin })
  return { y: height / 2, vy: 0, distance: 0, slices, blocks: [] as Block[], smoke: [] as { x: number; y: number }[], sinceBlock: 0 }
}

type World = ReturnType<typeof freshWorld>

const nextSlice = (last: Slice, distance: number): Slice => {
  const gap = Math.max(cave.minGap, cave.startGap - Math.floor(distance / cave.shrinkEvery) * 8)
  const centre = (last.top + last.bottom) / 2 + (Math.random() - 0.5) * cave.drift * 2
  const top = Math.min(height - gap - 10, Math.max(10, centre - gap / 2))
  return { top, bottom: top + gap }
}

const sliceX = (world: World, i: number) => i * cave.slice - (world.distance % cave.slice)

const crashed = (world: World) => {
  const top = world.y - heli.h / 2
  const bottom = world.y + heli.h / 2
  const touching = world.slices.filter((_, i) => {
    const x = sliceX(world, i)
    return x + cave.slice > heli.x && x < heli.x + heli.w
  })
  if (touching.some(s => top < s.top || bottom > s.bottom)) return true
  return world.blocks.some(b =>
    b.x < heli.x + heli.w && b.x + block.w > heli.x && b.y < bottom && b.y + block.h > top
  )
}

const draw = (ctx: CanvasRenderingContext2D, world: World, phase: Phase) => {
  ctx.fillStyle = ink.bg
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = ink.wall
  world.slices.forEach((s, i) => {
    const x = sliceX(world, i)
    ctx.fillRect(x, 0, cave.slice + 1, s.top)
    ctx.fillRect(x, s.bottom, cave.slice + 1, height - s.bottom)
  })

  ctx.fillStyle = ink.block
  world.blocks.forEach(b => ctx.fillRect(b.x, b.y, block.w, block.h))

  ctx.fillStyle = ink.smoke
  world.smoke.forEach(p => ctx.fillRect(p.x, p.y, 4, 4))

  const top = world.y - heli.h / 2
  ctx.fillStyle = ink.heli
  ctx.fillRect(heli.x + 8, top + 4, 22, 12)
  ctx.fillRect(heli.x, top + 8, 10, 3)
  ctx.fillRect(heli.x + 4, top, 30, 2)
  ctx.fillRect(heli.x + 18, top + 2, 2, 3)
  ctx.fillStyle = '#4060ff'
  ctx.fillRect(heli.x + 22, top + 6, 6, 5)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 16px "Courier New", monospace'
  ctx.textAlign = 'center'
  if (phase === 'ready') ctx.fillText('CLICK AND HOLD TO FLY', width / 2, height / 2 + 50)
  if (phase === 'crashed') {
    ctx.fillText('CRASHED!', width / 2, height / 2 - 10)
    ctx.fillText('CLICK TO TRY AGAIN', width / 2, height / 2 + 14)
  }
}

export const Helicopter = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const world = useRef<World>(freshWorld())
  const holding = useRef(false)
  const phaseRef = useRef<Phase>('ready')
  const [phase, setPhase] = useState<Phase>('ready')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  useEffect(() => setBest(readBest()), [])

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx) return
    let frame = 0
    let last = performance.now()
    let owed = 0

    const tick = () => {
      const w = world.current
      if (phaseRef.current === 'flying') {
        w.vy = Math.max(physics.maxRise, Math.min(physics.maxFall, w.vy + (holding.current ? physics.lift : physics.gravity)))
        w.y += w.vy
        const speed = pace.start + pace.extra * Math.min(1, w.distance / pace.rampOver)
        w.distance += speed
        const shift = speed
        w.blocks.forEach(b => { b.x -= shift })
        w.blocks = w.blocks.filter(b => b.x + block.w > 0)
        w.smoke.forEach(p => { p.x -= shift })
        w.smoke = [...w.smoke.filter(p => p.x > 0), { x: heli.x - 4, y: w.y + 2 }].slice(-14)
        w.sinceBlock += shift
        const scroll = Math.floor(w.distance / cave.slice) - Math.floor((w.distance - speed) / cave.slice)
        for (let i = 0; i < scroll; i++) {
          w.slices.shift()
          w.slices.push(nextSlice(w.slices[w.slices.length - 1], w.distance))
        }
        if (w.sinceBlock > block.every) {
          const edge = w.slices[w.slices.length - 1]
          w.blocks.push({ x: width, y: edge.top + Math.random() * Math.max(0, edge.bottom - edge.top - block.h) })
          w.sinceBlock = 0
        }
        setScore(Math.floor(w.distance / 10))
        if (crashed(w)) {
          phaseRef.current = 'crashed'
          setPhase('crashed')
          const final = Math.floor(w.distance / 10)
          setBest(prev => {
            if (final <= prev) return prev
            saveBest(final)
            return final
          })
        }
      }
    }

    const step = (now: number) => {
      owed = Math.min(owed + now - last, tickMs * maxCatchUp)
      last = now
      for (; owed >= tickMs; owed -= tickMs) tick()
      draw(ctx, world.current, phaseRef.current)
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const press = () => {
    holding.current = true
    if (phaseRef.current === 'flying') return
    world.current = freshWorld()
    setScore(0)
    phaseRef.current = 'flying'
    setPhase('flying')
  }

  const release = () => { holding.current = false }

  useEffect(() => {
    const isFlyKey = (e: KeyboardEvent) => e.code === 'Space' || e.code === 'ArrowUp'
    const down = (e: KeyboardEvent) => {
      if (!isFlyKey(e)) return
      e.preventDefault()
      if (!e.repeat) press()
    }
    const up = (e: KeyboardEvent) => { if (isFlyKey(e)) release() }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return (
    <Wrap>
      <Screen
        ref={canvas}
        width={width}
        height={height}
        role="img"
        aria-label={`Helicopter game, ${phase}`}
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); press() }}
        onPointerUp={release}
        onPointerCancel={release}
        onContextMenu={e => e.preventDefault()}
      />
      <Scores>
        <span>DISTANCE</span>
        <LedCounter label="Distance" value={score} digits={5} ink="#00ff00" />
        <span>BEST</span>
        <LedCounter label="Best" value={best} digits={5} ink="#00ff00" />
      </Scores>
    </Wrap>
  )
}
