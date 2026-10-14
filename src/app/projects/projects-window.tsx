'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import reactHtmlParser from 'react-html-parser'

import { Prose } from '../../components/prose'
import { ProjectCard } from '../../components/project-card'
import { Kicker, Window } from '../../components/window'
import { useGithubRepos, useRepoReadme, useVisited } from '../../hooks'
import { parseEmojis } from '../../helpers/parse-emojis'
import { selectProjects } from '../../helpers/projects'
import { stampMeta } from '../../helpers/stamp'
import { GHRepo } from '../../types'

const Stack = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
`

const Grid = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
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

  const projects = selectProjects(repos)
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
        info={`README.md · ${meta.lang}`}
        menus={[{
          label: 'File',
          items: [
            { label: 'Back to work', onSelect: () => router.push('/projects') },
            { label: 'Open in GitHub', href: repo.html_url, external: true }
          ]
        }]}
      >
        <Stack $gap={14}>
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
        <Kicker>WORK · {projects.length} {projects.length === 1 ? 'REPOSITORY' : 'REPOSITORIES'} · CLICK A PROJECT TO READ</Kicker>
        <Grid>
          {projects.map((project, i) => (
            <ProjectCard
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
