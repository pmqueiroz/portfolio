import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Cutive_Mono } from 'next/font/google'
import moment from 'moment'
import { cn } from '../helpers/cn'
import { Desktop } from '../components/desktop'
import { getPostSummaries } from '../service/posts'
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

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const posts = await getPostSummaries()
  const updated = moment().format('D MMM YYYY').toLowerCase()

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
          <Desktop posts={posts} updated={updated} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
