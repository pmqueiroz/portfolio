import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Cutive_Mono } from 'next/font/google'
import { cn } from '../helpers/cn'
import { Providers } from './providers'

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const cutiveMono = Cutive_Mono({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cutive-mono',
})

export const metadata: Metadata = {
  title: 'pmqueiroz'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          jetBrainsMono.variable,
          cutiveMono.variable,
          'antialiased font-[family-name:var(--font-jetbrains-mono)]',
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
