'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { keyframes } from 'styled-components'

import { theme } from '../../styles/theme'
import { BevelButton, BevelLink } from '../bevel-button'

const hiddenKey = 'pmq_clippy_hidden'
const appearAfter = 4000

interface Tip {
   text: string
   href?: string
   cta?: string
}

const tipsFor = (path: string): Tip[] => {
  if (path.startsWith('/arcade/minesweeper')) return [{ text: 'It looks like you\'re clicking squares at random. Right-click (or flag mode) marks a mine!' }]
  if (path.startsWith('/arcade/helicopter')) return [{ text: 'It looks like you\'re crashing a helicopter. Hold the mouse button or Space to climb!' }]
  if (path.startsWith('/guestbook')) return [{ text: 'It looks like you\'re signing a guestbook. Would you like help being nice?' }]
  if (path.startsWith('/blog')) return [{ text: 'It looks like you\'re reading a blog. Would you like me to read it louder?' }]
  if (path.startsWith('/projects')) return [{ text: 'It looks like you\'re browsing projects. Want to see the one with its own programming language?', href: '/projects?repo=umbra', cta: 'Show me' }]
  return [
    { text: 'It looks like you\'re hiring a developer. Would you like help?', href: '/about', cta: 'Yes, please' },
    { text: 'It looks like you\'re bored. Want to play a game?', href: '/arcade', cta: 'Open arcade' },
    { text: 'Did you know? Some old cheat codes still work on this page. ↑↑↓↓…' }
  ]
}

const bob = keyframes`
   0%, 100% { transform: translateY(0) rotate(-4deg); }
   50% { transform: translateY(-4px) rotate(4deg); }
`

const Dock = styled.aside`
   position: fixed;
   right: 16px;
   bottom: 16px;
   z-index: 30;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   gap: 4px;
   max-width: min(260px, calc(100vw - 32px));
   font-size: 12px;

   svg {
      animation: ${bob} 2.4s ease-in-out infinite;
      cursor: pointer;
   }

   @media (prefers-reduced-motion: reduce) {
      svg {
         animation: none;
      }
   }
`

const Balloon = styled.div`
   position: relative;
   padding: 10px 12px;
   background: #ffffe1;
   border: 1px solid ${theme.colors.dark};
   border-radius: 8px;
   line-height: 1.4;

   &::after {
      content: '';
      position: absolute;
      right: 28px;
      bottom: -9px;
      width: 14px;
      height: 14px;
      background: #ffffe1;
      border-right: 1px solid ${theme.colors.dark};
      border-bottom: 1px solid ${theme.colors.dark};
      transform: rotate(45deg);
   }

   .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
   }

   button,
   a {
      min-width: 0;
      padding: 2px 8px;
      font-size: 11px;
   }
`

const Paperclip = ({ onClick }: { onClick: () => void }) => (
  <svg width="56" height="80" viewBox="0 0 56 80" role="button" aria-label="Clippy, the assistant" onClick={onClick}>
    <path
      d="M18 70 V20 a10 10 0 0 1 20 0 V60 a6 6 0 0 1 -12 0 V26"
      fill="none"
      stroke="#7a7a7a"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M18 70 V20 a10 10 0 0 1 20 0 V60 a6 6 0 0 1 -12 0 V26"
      fill="none"
      stroke="#d8d8d8"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <ellipse cx="20" cy="30" rx="7" ry="8" fill="#fff" stroke="#000" />
    <ellipse cx="38" cy="30" rx="7" ry="8" fill="#fff" stroke="#000" />
    <circle cx="22" cy="32" r="3" />
    <circle cx="40" cy="32" r="3" />
    <path d="M12 18 q8 -8 14 -2 M32 16 q8 -6 14 2" fill="none" stroke="#000" strokeWidth="2" />
  </svg>
)

const readHidden = () => {
  try {
    return localStorage.getItem(hiddenKey) === '1'
  } catch (e) {
    return false
  }
}

export const Clippy = () => {
  const path = usePathname() ?? '/'
  const [present, setPresent] = useState(false)
  const [talking, setTalking] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (readHidden()) return
    const timer = setTimeout(() => setPresent(true), appearAfter)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIndex(0)
    setTalking(true)
  }, [path])

  if (!present) return null

  const tips = tipsFor(path)
  const tip = tips[index % tips.length]

  const dismiss = () => {
    setPresent(false)
    try {
      localStorage.setItem(hiddenKey, '1')
    } catch (e) {
      return
    }
  }

  return (
    <Dock aria-label="Assistant">
      {talking && (
        <Balloon role="status">
          {tip.text}
          <div className="actions">
            {tip.href && <BevelLink href={tip.href} onClick={() => setTalking(false)}>{tip.cta}</BevelLink>}
            {tips.length > 1 && <BevelButton type="button" onClick={() => setIndex(i => i + 1)}>Next tip</BevelButton>}
            <BevelButton type="button" onClick={() => setTalking(false)}>OK</BevelButton>
            <BevelButton type="button" onClick={dismiss}>Go away</BevelButton>
          </div>
        </Balloon>
      )}
      <Paperclip onClick={() => setTalking(t => !t)} />
    </Dock>
  )
}
