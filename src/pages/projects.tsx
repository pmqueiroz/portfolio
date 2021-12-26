import styled from 'styled-components'

import { Navigation } from '../components'
import { theme } from '../styles/theme'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const Container = styled.div`
  height: calc(100vh - ${theme.global.sizes.navigationHeight});
`

export default function Blog() {
  return (
    <Container>
      <Navigation />
      <Wrapper>
        Soon
      </Wrapper>
    </Container>
  )
}
