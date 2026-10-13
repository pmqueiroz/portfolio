'use client'

import { ReactNode, useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// styled-components v5 types omit `instance`, but it exists at runtime
type SheetWithInstance = ServerStyleSheet & { instance: { clearTag(): void } }

export const StyledComponentsRegistry = ({ children }: { children: ReactNode }) => {
  const [sheet] = useState(() => new ServerStyleSheet() as SheetWithInstance)

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement()
    sheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return <StyleSheetManager sheet={sheet.instance as never}>{children}</StyleSheetManager>
}
