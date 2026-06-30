'use client'

import { useState } from 'react'
import styled from 'styled-components'

import { ProjectCard } from '../../components'
import { withNavigation } from '../../hocs'
import { useGithubRepos, useVisited } from '../../hooks'
import { GHRepo } from '../../types'
import { RepositoryPreview } from '../../components/repository-preview'
import { theme } from '../../styles/theme'

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: ${theme.global.sizes.maxWidth};
  margin: 0 auto;
  padding: 3.5rem 2rem 6rem;
  width: 100%;
`

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 3px double ${theme.colors.dark};
  padding-bottom: 1.2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const Kicker = styled.div`
  font-size: 0.68rem;
  letter-spacing: 4px;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

const Title = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: lowercase;
  letter-spacing: -1px;
  line-height: 1;
`

const Lede = styled.p`
  font-family: 'Cutive Mono', monospace;
  font-size: 0.9rem;
  color: ${theme.colors.subtext};
  max-width: 40ch;
  text-align: right;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 3.4rem 3rem;
  justify-items: center;
`

const PreviewWrapper = styled.section`
  flex-grow: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 3rem 2rem;
`

const filterProjects = (repos?: GHRepo[]) => {
  return repos?.filter(r => r.topics.includes('portfolio-visible'))
}

export const ProjectsPage = withNavigation(() => {
  const [selectedRepo, selectRepo] = useState<GHRepo | null>(null)
  const { isVisited, markVisited } = useVisited()

  const { repos } = useGithubRepos('pmqueiroz')
  const projects = filterProjects(repos)

  const open = (repo: GHRepo) => {
    markVisited(repo.name)
    selectRepo(repo)
  }

  if (selectedRepo) {
    return (
      <PreviewWrapper>
        <RepositoryPreview repo={selectedRepo} onClose={() => selectRepo(null)} />
      </PreviewWrapper>
    )
  }

  return (
    <Wrapper>
      <Header>
        <div>
          <Kicker>Catalogue of</Kicker>
          <Title>the work</Title>
        </div>
        <Lede>Each project is a stamp in the album. Click any to read its README.</Lede>
      </Header>
      <Grid>
        {projects?.map((project, i) => (
          <ProjectCard
            key={project.id}
            repo={project}
            index={i}
            visited={isVisited(project.name)}
            onClick={open}
          />
        ))}
      </Grid>
    </Wrapper>
  )
})
