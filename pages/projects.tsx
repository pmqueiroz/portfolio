import styled from 'styled-components'

import { Grid, ProjectCard } from '../src/components'
import { withNavigation } from '../src/hocs'
import { useGithubRepos } from '../src/hooks'
import { GHRepo } from '../src/types'
import { RepositoryPreview } from '../src/components/repository-preview'
import { useState } from 'react'
import { Case, Default, Switch } from 'react-if'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

const filterProjects = (repos?: GHRepo[]) => {
    return repos?.filter(r => r.topics.includes('portfolio-visible'))
}

function Projects() {
    const [selectedRepo, selectRepo] = useState<GHRepo | null>(null)

    const { repos } = useGithubRepos('pmqueiroz')

    const projects = filterProjects(repos)
    
    return (
        <Wrapper>
            <Switch>
                <Case condition={selectedRepo != null}>
                    <RepositoryPreview repo={selectedRepo} onClose={() => selectRepo(null)} />
                </Case>
                <Default>
                    <Grid style={{ padding: '5rem' }} gutter="5rem" min="40ch">
                        {projects?.map(project => <ProjectCard key={project.id} repo={project} onClick={selectRepo} />)}
                    </Grid>
                </Default>
            </Switch>
        </Wrapper>
    )
}

export default withNavigation(Projects)
