'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useWindowPosition } from '../../hooks'
import { Menu, MenuBar } from '../menu-bar'

import * as S from './styles'

type Section = 'work' | 'blog' | 'about'

const sections: { key: Section; href: string; label: string }[] = [
  { key: 'work', href: '/projects', label: 'Work' },
  { key: 'blog', href: '/blog', label: 'Blog' },
  { key: 'about', href: '/about', label: 'About me' }
]

const source = 'https://github.com/pmqueiroz/portfolio'

const standardMenus = (section: Section | undefined, close: () => void): Menu[] => [
  { label: 'File', items: [{ label: 'Close', shortcut: 'Esc', onSelect: close }] },
  {
    label: 'Go',
    items: [
      ...sections.map(({ key, href, label }) => ({ label, href, checked: key === section })),
      'separator',
      { label: 'Search…', href: '/search' },
      { label: 'Desktop', href: '/' }
    ]
  },
  {
    label: 'Help',
    items: [
      { label: 'About pmqueiroz', href: '/about' },
      { label: 'View source', href: source, external: true }
    ]
  }
]

const mergeMenus = (standard: Menu[], extra: Menu[]): Menu[] => {
  const merged = standard.map(menu => {
    const match = extra.find(e => e.label === menu.label)
    return match ? { ...menu, items: [...match.items, 'separator' as const, ...menu.items] } : menu
  })
  const added = extra.filter(e => !standard.some(menu => menu.label === e.label))
  return [...merged.slice(0, -1), ...added, ...merged.slice(-1)]
}

interface WindowProps {
   title: string
   section?: Section
   path: string
   status?: string
   menus?: Menu[]
   info?: ReactNode
   children: ReactNode
}

export const Window = ({ title, section, path, status = 'Done', menus = [], info, children }: WindowProps) => {
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
        <MenuBar menus={mergeMenus(standardMenus(section, close), menus)} aside={info} />
        <S.Viewport ref={viewport}>{children}</S.Viewport>
        <S.StatusBar>
          <span>{status} — https://pmqueiroz.dev{path}</span>
          <span>esc to close</span>
        </S.StatusBar>
      </S.Frame>
    </S.Backdrop>
  )
}
