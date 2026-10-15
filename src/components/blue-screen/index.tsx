'use client'

import { useEffect } from 'react'
import styled from 'styled-components'

const Screen = styled.div`
   position: fixed;
   inset: 0;
   z-index: 100;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 16px;
   background: #0000aa;
   color: #ffffff;
   font-family: 'Courier New', monospace;
   font-size: 16px;
   line-height: 1.5;
   cursor: none;

   .box {
      max-width: 640px;
   }

   .title {
      display: table;
      margin: 0 auto 24px;
      padding: 0 8px;
      background: #aaaaaa;
      color: #0000aa;
      font-weight: 700;
   }

   p + p {
      margin-top: 16px;
   }

   .prompt {
      text-align: center;
      margin-top: 32px;
   }

   .cursor {
      animation: blink 1s steps(1) infinite;
   }
`

interface BlueScreenProps {
   onDismiss: () => void
}

export const BlueScreen = ({ onDismiss }: BlueScreenProps) => {
  useEffect(() => {
    const dismiss = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDismiss()
    }
    const timer = setTimeout(() => window.addEventListener('keydown', dismiss, { capture: true, once: true }), 300)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', dismiss, { capture: true })
    }
  }, [onDismiss])

  return (
    <Screen role="alertdialog" aria-label="Easter egg: blue screen" onClick={onDismiss}>
      <div className="box">
        <span className="title">Windows</span>
        <p>
          A fatal exception 0E has occurred at 0028:C0DE1337 in VXD KONAMI(01) +
          00001987. The current visitor will be granted 30 extra lives.
        </p>
        <p>
          * Press any key to return to pmqueiroz.dev.<br />
          * Press CTRL+ALT+DEL again to hire pmqueiroz. You will lose any
          unsaved bugs in all applications.
        </p>
        <p className="prompt">Press any key to continue <span className="cursor">_</span></p>
      </div>
    </Screen>
  )
}
