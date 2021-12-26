import Typewriter from 'typewriter-effect'
import styled from 'styled-components'

import { theme } from '../styles/theme'
import { withNavigation } from '../hocs'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
`

const Title = styled.h1`
  font-size: 9rem;
  font-weight: 700;
  text-transform: uppercase;
`

function Home() {
    return (
        <Wrapper>
            <Title>
                <Typewriter onInit={(typewriter) => {
                    typewriter
                        .typeString('pmqueiroz')
                        .start()
                }} />
            </Title>
            <Typewriter options={{ loop: true }} onInit={(typewriter) => {
                typewriter
                    .pauseFor(1500)
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
    )
}

export default withNavigation(Home)
