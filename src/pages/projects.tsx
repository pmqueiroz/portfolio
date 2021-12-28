import styled from 'styled-components'

import { withNavigation } from '../hocs'
import { useGithubRepos } from '../hooks'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

function Projects() {
    const { repos } = useGithubRepos('pmqueiroz')


    console.log(repos)

    return (
        <Wrapper>
          Soon
        </Wrapper>
    )
}

export default withNavigation(Projects)
