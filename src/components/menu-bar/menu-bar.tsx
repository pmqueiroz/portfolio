'use client'

import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react'

import * as S from './styles'

export type MenuItem =
   | 'separator'
   | {
      label: string
      href?: string
      external?: boolean
      onSelect?: () => void
      checked?: boolean
      shortcut?: string
   }

export interface Menu {
   label: string
   items: MenuItem[]
}

interface MenuBarProps {
   menus: Menu[]
   aside?: ReactNode
}

const Accelerated = ({ label }: { label: string }) => (
  <span><u>{label[0]}</u>{label.slice(1)}</span>
)

export const MenuBar = ({ menus, aside }: MenuBarProps) => {
  const [open, setOpen] = useState<number | null>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open === null) return
    const onPointerDown = (e: PointerEvent) => {
      if (!bar.current?.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open !== null) {
      e.stopPropagation()
      setOpen(null)
    }
  }

  const close = () => setOpen(null)

  return (
    <S.Bar ref={bar} role="menubar" onKeyDown={onKeyDown}>
      <S.Menus>
        {menus.map((menu, index) => (
          <S.Slot key={menu.label}>
            <S.Trigger
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={open === index}
              $open={open === index}
              onClick={() => setOpen(open === index ? null : index)}
              onPointerEnter={() => open !== null && setOpen(index)}
            >
              <Accelerated label={menu.label} />
            </S.Trigger>
            {open === index && (
              <S.Dropdown role="menu" aria-label={menu.label}>
                {menu.items.map((entry, i) => {
                  if (entry === 'separator') return <S.Separator key={`separator-${i}`} />
                  const content = (
                    <>
                      <span aria-hidden="true">{entry.checked ? '●' : ''}</span>
                      <span>{entry.label}{entry.external && ' ↗'}</span>
                      <span className="shortcut">{entry.shortcut}</span>
                    </>
                  )
                  const props = { role: 'menuitem' }
                  if (entry.href && entry.external) {
                    return <S.ItemAnchor key={entry.label} {...props} href={entry.href} target="_blank" rel="noreferrer" onClick={close}>{content}</S.ItemAnchor>
                  }
                  if (entry.href) {
                    return <S.ItemLink key={entry.label} {...props} href={entry.href} aria-current={entry.checked ? 'page' : undefined} onClick={close}>{content}</S.ItemLink>
                  }
                  return <S.ItemButton key={entry.label} {...props} type="button" onClick={() => { close(); entry.onSelect?.() }}>{content}</S.ItemButton>
                })}
              </S.Dropdown>
            )}
          </S.Slot>
        ))}
      </S.Menus>
      {aside && <S.Aside>{aside}</S.Aside>}
    </S.Bar>
  )
}
