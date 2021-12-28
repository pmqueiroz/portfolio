import styled from 'styled-components'
import { Grid, ProjectCard } from '../components'

import { withNavigation } from '../hocs'
import { useGithubRepos } from '../hooks'
import { GHRepo } from '../types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 5rem;
`

const filterProjects = (repos?: GHRepo[]) => {
    return repos?.filter(r => r.topics.includes('portfolio-visible'))
}

function Projects() {
    const { repos } = useGithubRepos('pmqueiroz')

    const projects = filterProjects(repos)

    return (
        <Wrapper>
            <Grid gutter="5rem" min="40ch">
                {projects?.map(project => <ProjectCard key={project.id} repo={project} />)}
            </Grid>
        </Wrapper>
    )
}

export default withNavigation(Projects)
