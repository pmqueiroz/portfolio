'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useWindowPosition } from '../../hooks'

import * as S from './styles'

type Section = 'work' | 'journal' | 'colophon'

const tabs: { key: Section; href: string; label: string }[] = [
  { key: 'work', href: '/projects', label: 'Work' },
  { key: 'journal', href: '/blog', label: 'Journal' },
  { key: 'colophon', href: '/about', label: 'Colophon' }
]

interface WindowProps {
   title: string
   section: Section
   path: string
   status?: string
   children: ReactNode
}

export const Window = ({ title, section, path, status = 'Done', children }: WindowProps) => {
  const router = useRouter()
  const viewport = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const { position, dragHandlers } = useWindowPosition(frame)

  const close = () => router.push('/')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') router.push('/') }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [router])

  useEffect(() => {
    viewport.current?.scrollTo(0, 0)
  }, [path])

  return (
    <S.Backdrop onClick={close}>
      <S.Frame
        ref={frame}
        role="dialog"
        aria-modal="true"
        aria-labelledby="window-title"
        $floating={position !== null}
        style={position ? { left: position.x, top: position.y } : undefined}
        onClick={e => e.stopPropagation()}
      >
        <S.TitleBar $draggable={position !== null} {...dragHandlers}>
          <h2 id="window-title">pmqueiroz — {title}</h2>
          <S.Close type="button" aria-label="Close" onClick={close}>×</S.Close>
        </S.TitleBar>
        <S.Tabs>
          {tabs.map(tab => (
            <S.Tab key={tab.key} href={tab.href} $active={tab.key === section}>
              {tab.label}
            </S.Tab>
          ))}
        </S.Tabs>
        <S.Viewport ref={viewport}>{children}</S.Viewport>
        <S.StatusBar>
          <span>{status} — https://pmqueiroz.dev{path}</span>
          <span>esc to close</span>
        </S.StatusBar>
      </S.Frame>
    </S.Backdrop>
  )
}
