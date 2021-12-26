import Typewriter from 'typewriter-effect'
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
const Title = styled.h1`
  font-size: 9rem;
  font-weight: 700;
  text-transform: uppercase;
`

export default function Home() {
  return (
    <Container>
      <Navigation />
      <Wrapper>
        <Title>pmqueiroz</Title>
        <Typewriter options={{ loop: true }} onInit={(typewriter) => {
          typewriter
            .typeString('developer')
            .pauseFor(1500)
            .deleteAll()
            .typeString('front ender')
            .pauseFor(1500)
            .deleteAll()
            .typeString('open source enthusiastic')
            .pauseFor(1500)
            .deleteAll()
            .typeString(`react submissive <span style="color: ${theme.colors.red};">( ͡° ͜ʖ ͡°)</span>`)
            .start()
        }} />
      </Wrapper>
    </Container>
  )
}
