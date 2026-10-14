'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { forgetWindowPosition, useGithubRepos, useReadingMode, useTypeLoop, useTypeOnce } from '../../hooks'
import { selectProjects } from '../../helpers/projects'
import { stampMeta } from '../../helpers/stamp'
import { entryNumber } from '../../helpers/entry-number'
import { PostSummary } from '../../types'
import { BevelLink } from '../bevel-button'
import { Emojify } from '../emoji'
import { JournalList } from '../journal-list'
import { Logo } from '../logo'
import { Panel } from '../panel'
import { RetroImage } from '../retro-image'

import * as S from './styles'

const handleName = 'pmqueiroz'

const taglines = ['developer', 'front-end', 'open-source enthusiast', 'typescript lover']

const guestbook = 'mailto:contact@pmqueiroz.dev?subject=guestbook'

const umbra = 'https://github.com/pmqueiroz/umbra'

const navigation = [
  { href: '/projects', label: 'work' },
  { href: '/blog', label: 'blog' },
  { href: '/about', label: 'about me' },
  { href: guestbook, label: 'guestbook' }
]

const elsewhere = [
  { href: 'https://github.com/pmqueiroz', label: 'github' },
  { href: 'https://www.linkedin.com/in/pmqueiroz/', label: 'linkedin' },
  { href: 'mailto:contact@pmqueiroz.dev', label: 'e-mail' }
]

const visitors = '004217'

const badges = [
  { top: 'powered by', main: 'NEXT.JS', ink: '#17150f', ground: '#eeeeee', title: 'Next.js' },
  { top: 'written in', main: 'TYPESCRIPT', ink: '#2f5fa8', ground: '#dce8fb', title: 'TypeScript' },
  { top: 'try my lang', main: 'UMBRA', ink: '#5a2f57', ground: '#f1dcef', title: 'Umbra' },
  { top: 'subscribe', main: 'RSS FEED', ink: '#b4561a', ground: '#fde7cf', title: 'RSS' },
  { top: 'code on', main: 'GITHUB', ink: '#1f6b3a', ground: '#d8f0dd', title: 'GitHub' }
]

const webring = ['« prev site', 'random', 'next site »']

interface DesktopProps {
   posts: PostSummary[]
   updated: string
}

export const Desktop = ({ posts, updated }: DesktopProps) => {
  const handle = useTypeOnce(handleName)
  const tagline = useTypeLoop(taglines)
  const { reading, toggleReading } = useReadingMode()
  const { repos } = useGithubRepos('pmqueiroz')
  const featured = selectProjects(repos).slice(0, 3).map(stampMeta)
  const flashy = !reading
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') forgetWindowPosition()
  }, [pathname])

  return (
    <S.Screen>
      <S.Page>
        <S.Header>
          <div>
            <Logo name={handleName} typed={handle} suffix=".dev" flashy={flashy} />
            <S.Tagline>{tagline}</S.Tagline>
          </div>
          <S.Crumbs>
            home » <b>index</b>
            <br />
            last updated: {updated}
          </S.Crumbs>
        </S.Header>

        {flashy && (
          <S.Ticker>
            ★ WELCOME TO MY HOMEPAGE! ★
            {posts.length > 0 && ` NEW: blog post #${entryNumber(posts.length, 0)} is up ★`}
            {' '}don&apos;t forget to sign my guestbook ★ you are visitor #{visitors} ★
          </S.Ticker>
        )}

        <S.Columns>
          <S.Aside>
            <S.SideBox title="Navigate">
              <S.LinkList>
                <S.Current>▸ index</S.Current>
                {navigation.map(({ href, label }) => (
                  <Link key={label} href={href}>» {label}</Link>
                ))}
              </S.LinkList>
            </S.SideBox>
            <S.SideBox title="Elsewhere">
              <S.LinkList>
                {elsewhere.map(({ href, label }) => (
                  <a key={label} href={href}>· {label}</a>
                ))}
              </S.LinkList>
            </S.SideBox>
            {flashy && (
              <S.Favorites>
                <RetroImage src="/junk/handshake-laptops.jpg" alt="Two orange figures shaking hands from laptops" width={140} height={96} $fit="contain" />
                <RetroImage src="/junk/globe-cable.webp" alt="Globe plugged into a power cable" width={140} height={92} />
                <span>» Add me to your favorites! «</span>
              </S.Favorites>
            )}
            <S.Counter>
              <span className="label">VISITORS</span>
              <div className="digits" aria-label={`${Number(visitors)} visitors`}>
                {visitors.split('').map((d, i) => <span key={i} className="digit">{d}</span>)}
              </div>
            </S.Counter>
            <S.ReadingToggle type="button" aria-pressed={reading} onClick={toggleReading}>
              {reading ? '☑ READING MODE' : '☐ READING MODE'}
            </S.ReadingToggle>
          </S.Aside>

          <S.Main>
            {flashy && (
              <>
                <S.Gallery>
                  <RetroImage src="/junk/crt-handshake.jpeg" alt="Two hands shaking between CRT monitors" width={150} height={100} />
                  <RetroImage src="/junk/thumbs-up-laptop.jpeg" alt="Man in a tie giving a thumbs-up while holding a laptop" width={150} height={100} />
                  <RetroImage src="/junk/support-agent.jpeg" alt="Support agent with headset" width={150} height={100} />
                </S.Gallery>
                <S.Announcement>
                  <strong>NEW!!</strong>
                  <span>Umbra, my little programming language, just got a new release — go try it!</span>
                  <a href={`${umbra}/releases`}>» download now</a>
                </S.Announcement>
              </>
            )}

            <S.Intro>
              Front-end developer from Brazil, building things from scratch since 2017 — a
              language, CLIs, static-site generators.
            </S.Intro>

            <S.Actions>
              <BevelLink href="/projects">BROWSE THE WORK →</BevelLink>
              <BevelLink href="/blog">READ THE BLOG</BevelLink>
            </S.Actions>

            <Panel title="Selected work" action={<Link href="/projects">all work »</Link>}>
              <S.Featured>
                {featured.map(project => (
                  <S.FeaturedRow key={project.name} $thumb={flashy}>
                    {flashy && <RetroImage src="/junk/project.gif" alt="" width={64} height={48} $fit="contain" />}
                    <div>
                      <S.FeaturedName>
                        <span className="bullet">»</span>{' '}
                        <Link href={`/projects?repo=${encodeURIComponent(project.name)}`}>{project.name}</Link>{' '}
                        <span className="lang">[{project.lang}]</span>
                      </S.FeaturedName>
                      <S.FeaturedBlurb><Emojify text={project.blurb} /></S.FeaturedBlurb>
                    </div>
                  </S.FeaturedRow>
                ))}
              </S.Featured>
            </Panel>

            <Panel title="Latest blog posts">
              <JournalList posts={posts} variant="compact" limit={3} />
            </Panel>
          </S.Main>
        </S.Columns>

        {flashy && (
          <S.Guestbook>
            <RetroImage src="/junk/mailbox.gif" alt="Mailbox LED sign" width={90} height={48} $fit="contain" />
            <a className="sign" href={guestbook}>✎ SIGN MY GUESTBOOK ✎</a>
            <S.Ad href={umbra} aria-label="Ad: UmbraHost">
              <span className="free">FREE!</span>
              <span className="copy">
                <b>UmbraHost.net</b>
                <span>10 MB web space · 56k ready · no pop-ups*</span>
              </span>
              <span className="cta">CLICK HERE</span>
            </S.Ad>
          </S.Guestbook>
        )}

        <S.Footer>
          <S.Webring aria-label="Webring">
            <span className="ring">[ dev homepages ring ]</span>
            {webring.map((label, i) => (
              <span key={label}>
                {i > 0 && <span className="sep">|</span>}
                <a href="#">{label}</a>
              </span>
            ))}
          </S.Webring>
          <S.Badges>
            {badges.map(badge => (
              <S.Badge key={badge.main} title={badge.title} style={{ background: badge.ground }}>
                <span className="top">{badge.top}</span>
                <span className="main" style={{ color: badge.ink }}>{badge.main}</span>
              </S.Badge>
            ))}
          </S.Badges>
          <span className="notice">
            © {new Date().getFullYear()} Pedro Queiroz
          </span>
        </S.Footer>
      </S.Page>
    </S.Screen>
  )
}
