'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'

import { Panel } from '../../components/panel'
import { SearchBox } from '../../components/search-box'
import { Kicker, Window } from '../../components/window'
import { useGithubRepos } from '../../hooks'
import { selectProjects } from '../../helpers/projects'
import { searchSite } from '../../helpers/search'
import { stampMeta } from '../../helpers/stamp'
import { theme } from '../../styles/theme'
import { PostSummary } from '../../types'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Results = styled.ul`
  list-style: none;
  font-size: 13px;

  li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 10px;
    border-top: 1px solid ${theme.colors.line};
  }

  li:first-child {
    border-top: none;
  }

  .meta {
    font-size: 11px;
    color: ${theme.colors.subtext};
  }
`

const Empty = styled.p`
  padding: 10px;
  font-size: 13px;
  color: ${theme.colors.subtext};
`

export const SearchWindow = ({ posts }: { posts: PostSummary[] }) => {
  const query = useSearchParams()?.get('q')?.trim() ?? ''
  const { repos, isLoading } = useGithubRepos('pmqueiroz')
  const projects = selectProjects(repos).map(stampMeta)
  const found = searchSite(query, posts, projects)
  const total = found.posts.length + found.projects.length

  return (
    <Window
      title={query ? `search » ${query}` : 'search'}
      path={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
      status={isLoading ? 'Loading' : 'Done'}
    >
      <Stack>
        <SearchBox defaultValue={query} />
        {query && (
          <>
            <Kicker>{total} {total === 1 ? 'MATCH' : 'MATCHES'} FOR “{query}”</Kicker>
            <Panel title={`Blog posts (${found.posts.length})`}>
              {found.posts.length > 0 ? (
                <Results>
                  {found.posts.map(post => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>📝 {post.title}</Link>
                      {post.description && <span className="meta">{post.description}</span>}
                    </li>
                  ))}
                </Results>
              ) : <Empty>No posts match.</Empty>}
            </Panel>
            <Panel title={`Projects (${found.projects.length})`}>
              {found.projects.length > 0 ? (
                <Results>
                  {found.projects.map(project => (
                    <li key={project.name}>
                      <Link href={`/projects?repo=${encodeURIComponent(project.name)}`}>📁 {project.name}</Link>
                      <span className="meta">[{project.lang}] {project.blurb}</span>
                    </li>
                  ))}
                </Results>
              ) : <Empty>{isLoading ? 'Searching…' : 'No projects match.'}</Empty>}
            </Panel>
          </>
        )}
      </Stack>
    </Window>
  )
}
