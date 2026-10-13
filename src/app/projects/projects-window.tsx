'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import reactHtmlParser from 'react-html-parser'

import { BevelButton } from '../../components/bevel-button'
import { featuredRepos } from '../../components/desktop'
import { Prose } from '../../components/prose'
import { Stamp } from '../../components/stamp'
import { Kicker, Window } from '../../components/window'
import { useGithubRepos, useRepoReadme, useVisited } from '../../hooks'
import { parseEmojis } from '../../helpers/parse-emojis'
import { stampMeta } from '../../helpers/stamp'
import { GHRepo } from '../../types'

const Stack = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
`

const Grid = styled.div`
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  justify-content: center;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
`

const Name = styled.h1`
  font-size: 28px;
  overflow-wrap: anywhere;
`

export const ProjectsWindow = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { isVisited, markVisited } = useVisited()
  const { repos, isLoading } = useGithubRepos('pmqueiroz')

  const projects = featuredRepos(repos)
  const index = projects.findIndex(r => r.name === params?.get('repo'))
  const repo = index === -1 ? undefined : projects[index]
  const { readme, isLoading: readmeLoading } = useRepoReadme(repo?.full_name ?? '')

  useEffect(() => {
    if (repo) markVisited(repo.name)
  }, [repo, markVisited])

  const open = (next: GHRepo) => router.push(`/projects?repo=${encodeURIComponent(next.name)}`)

  if (repo) {
    const meta = stampMeta(repo, index)

    return (
      <Window
        title="work » readme"
        section="work"
        path={`/projects?repo=${repo.name}`}
        status={readmeLoading ? 'Loading' : 'Done'}
      >
        <Stack $gap={14}>
          <Toolbar>
            <BevelButton $compact onClick={() => router.push('/projects')}>« Back</BevelButton>
            <a href={repo.html_url} target="_blank" rel="noreferrer">open in github ↗</a>
          </Toolbar>
          <Kicker>README.md · {meta.lang} · {isVisited(repo.name) ? 'CANCELED' : 'MINT'}</Kicker>
          <Name>{meta.name}</Name>
          <Prose>
            <p>{meta.blurb}</p>
            {reactHtmlParser(parseEmojis(readme))}
          </Prose>
        </Stack>
      </Window>
    )
  }

  return (
    <Window title="work" section="work" path="/projects" status={isLoading ? 'Loading' : 'Done'}>
      <Stack $gap={18}>
        <Kicker>WORK · {projects.length} {projects.length === 1 ? 'REPOSITORY' : 'REPOSITORIES'} · CLICK A STAMP TO READ</Kicker>
        <Grid>
          {projects.map((project, i) => (
            <Stamp
              key={project.id}
              repo={project}
              index={i}
              visited={isVisited(project.name)}
              onClick={open}
            />
          ))}
        </Grid>
      </Stack>
    </Window>
  )
}
