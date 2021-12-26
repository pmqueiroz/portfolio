import styled from 'styled-components'

import { withNavigation } from '../hocs'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

function Blog() {
    return (
        <Wrapper>
      Soon
        </Wrapper>
    )
}

export default withNavigation(Blog)
