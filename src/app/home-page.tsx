'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Typewriter from 'typewriter-effect'
import styled from 'styled-components'

import { withNavigation } from '../hocs'
import { ProjectCard, Seal } from '../components'
import { useGithubRepos, useVisited } from '../hooks'
import { GHRepo } from '../types'
import { theme } from '../styles/theme'

const Main = styled.div`
  flex-grow: 1;
`

const Rule = styled.section`
  max-width: ${theme.global.sizes.maxWidth};
  margin: 0 auto;
  padding: 2rem 2rem 0;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.68rem;
    letter-spacing: 2px;
    color: ${theme.colors.muted};
    text-transform: uppercase;
    border-bottom: 1px solid #cfc6b2;
    padding-bottom: 0.6rem;
  }
`

const Hero = styled.section`
  position: relative;
  max-width: ${theme.global.sizes.maxWidth};
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
  text-align: center;
`

const SealHolder = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 2rem;
  transform: rotate(8deg);
  opacity: 0.92;

  @media (max-width: ${theme.global.breakpoints.mobile}px) {
    display: none;
  }
`

const Title = styled.h1`
  font-size: clamp(3rem, 11vw, 8.5rem);
  font-weight: 700;
  text-transform: lowercase;
  letter-spacing: -2px;
  line-height: 0.95;
  min-height: 0.95em;

  .Typewriter {
    display: inline;
  }
`

const Subtitle = styled.div`
  margin-top: 1.6rem;
  font-size: clamp(1rem, 2.4vw, 1.5rem);
  color: #3b372d;
  min-height: 1.5em;

  strong {
    background: ${theme.colors.highlight};
    padding: 0 4px;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 1.4rem;
  justify-content: center;
  margin-top: 2.4rem;
  flex-wrap: wrap;
`

const PrimaryCta = styled(Link)`
  background: ${theme.colors.dark};
  color: ${theme.colors.base};
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.85rem 1.6rem;
  box-shadow: 5px 5px 0 0 ${theme.colors.shadow};
`

const SecondaryCta = styled(Link)`
  background: ${theme.colors.base};
  border: 1.5px solid ${theme.colors.dark};
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.85rem 1.6rem;
  box-shadow: 5px 5px 0 0 ${theme.colors.lineStrong};
`

const Featured = styled.section`
  max-width: ${theme.global.sizes.maxWidth};
  margin: 0 auto;
  padding: 1rem 2rem 5rem;
`

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.4rem;

  h2 {
    font-size: 0.85rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .line {
    flex: 1;
    height: 1px;
    background: #cfc6b2;
  }

  a {
    font-size: 0.72rem;
    letter-spacing: 1px;
    color: ${theme.colors.muted};
    text-transform: uppercase;
  }
`

const Stamps = styled.div`
  display: flex;
  gap: 3.2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const filterProjects = (repos?: GHRepo[]) =>
  repos?.filter(r => r.topics.includes('portfolio-visible'))

export const HomePage = withNavigation(() => {
  const router = useRouter()
  const { isVisited, markVisited } = useVisited()
  const { repos } = useGithubRepos('pmqueiroz')
  const featured = filterProjects(repos)?.slice(0, 3) ?? []

  const openProject = (name: string) => {
    markVisited(name)
    router.push('/projects')
  }

  return (
    <Main>
      <Rule>
        <div>
          <span>No. 042</span>
          <span>BR</span>
        </div>
      </Rule>

      <Hero>
        <SealHolder>
          <Seal />
        </SealHolder>

        <Title>
          <Typewriter
            options={{ cursor: '_', delay: 105 }}
            onInit={(typewriter) => {
              typewriter.typeString('pmqueiroz').start()
            }}
          />
        </Title>

        <Subtitle>
          <Typewriter
            options={{ loop: true, delay: 62, deleteSpeed: 30 }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1500)
                .typeString('developer')
                .pauseFor(1700)
                .deleteAll()
                .typeString('<strong>front</strong>-end')
                .pauseFor(1700)
                .deleteAll()
                .typeString('open-source <strong>enthusiast</strong>')
                .pauseFor(1700)
                .deleteAll()
                .typeString('typescript lover')
                .pauseFor(1700)
                .deleteAll()
                .start()
            }}
          />
        </Subtitle>

        <Actions>
          <PrimaryCta href="/projects">Browse the work →</PrimaryCta>
          <SecondaryCta href="/blog">Read the journal</SecondaryCta>
        </Actions>
      </Hero>

      <Featured>
        <SectionHead>
          <h2>Selected Issues</h2>
          <span className="line" />
          <Link href="/projects">all work →</Link>
        </SectionHead>
        <Stamps>
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              repo={project}
              index={i}
              visited={isVisited(project.name)}
              onClick={() => openProject(project.name)}
              variant="featured"
            />
          ))}
        </Stamps>
      </Featured>
    </Main>
  )
})
