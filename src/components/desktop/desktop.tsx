'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useGithubRepos, useTypeLoop, useTypeOnce, useVisited } from '../../hooks'
import { selectProjects } from '../../helpers/projects'
import { GHRepo, PostSummary } from '../../types'
import { BevelLink } from '../bevel-button'
import { JournalList } from '../journal-list'
import { Panel } from '../panel'
import { Stamp } from '../stamp'

import * as S from './styles'

const taglines = ['developer', 'front-end', 'open-source enthusiast', 'typescript lover']

const navigation = [
  { href: '/projects', label: 'work' },
  { href: '/blog', label: 'journal' },
  { href: '/about', label: 'colophon' },
  { href: 'mailto:contact@pmqueiroz.dev?subject=guestbook', label: 'guestbook' }
]

const elsewhere = [
  { href: 'https://github.com/pmqueiroz', label: 'github' },
  { href: 'https://www.linkedin.com/in/pmqueiroz/', label: 'linkedin' },
  { href: 'mailto:contact@pmqueiroz.dev', label: 'e-mail' }
]

const visitors = '004217'

const badges = [
  ['TS', 'TYPE-SCRIPT'],
  ['N', 'MADE WITH NEXT.JS'],
  ['#!', 'UMBRA LANG'],
  ['RSS', 'SUBSCRIBE'],
  ['4.01', 'VALID HTML']
]

interface DesktopProps {
   posts: PostSummary[]
   updated: string
}

export const Desktop = ({ posts, updated }: DesktopProps) => {
  const router = useRouter()
  const handle = useTypeOnce('pmqueiroz')
  const tagline = useTypeLoop(taglines)
  const { isVisited } = useVisited()
  const { repos } = useGithubRepos('pmqueiroz')
  const featured = selectProjects(repos).slice(0, 3)

  const openRepo = (repo: GHRepo) => router.push(`/projects?repo=${encodeURIComponent(repo.name)}`)

  return (
    <S.Screen>
      <S.Page>
        <S.Header>
          <div>
            <S.Handle>{handle}<S.Cursor aria-hidden>_</S.Cursor></S.Handle>
            <S.Tagline>{tagline}</S.Tagline>
          </div>
          <S.Crumbs>
            home » <b>index</b>
            <br />
            last updated: {updated}
          </S.Crumbs>
        </S.Header>

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
            <S.Counter>
              <span className="label">VISITORS</span>
              <div className="digits" aria-label={`${Number(visitors)} visitors`}>
                {visitors.split('').map((d, i) => <span key={i} className="digit">{d}</span>)}
              </div>
            </S.Counter>
          </S.Aside>

          <S.Main>
            <S.Intro>
              Front-end developer from Brazil, building things from scratch since 2017 — a
              language, CLIs, static-site generators.
            </S.Intro>

            <S.Actions>
              <BevelLink href="/projects">BROWSE THE WORK →</BevelLink>
              <BevelLink href="/blog">READ THE JOURNAL</BevelLink>
            </S.Actions>

            <Panel title="Selected work" action={<Link href="/projects">all work »</Link>}>
              <S.Stamps>
                {featured.map((repo, i) => (
                  <Stamp
                    key={repo.id}
                    repo={repo}
                    index={i}
                    size="featured"
                    visited={isVisited(repo.name)}
                    onClick={openRepo}
                  />
                ))}
              </S.Stamps>
            </Panel>

            <Panel title="Latest journal entries">
              <JournalList posts={posts} variant="compact" limit={3} />
            </Panel>
          </S.Main>
        </S.Columns>

        <S.Footer>
          <S.Badges>
            {badges.map(([a, b]) => (
              <S.Badge key={b}><span>{a}</span><span>{b}</span></S.Badge>
            ))}
          </S.Badges>
          <span className="notice">© {new Date().getFullYear()} · BEST VIEWED IN ANY BROWSER</span>
        </S.Footer>
      </S.Page>
    </S.Screen>
  )
}
