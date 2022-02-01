import Typewriter from 'typewriter-effect'
import styled from 'styled-components'

import { withNavigation } from '../src/hocs'

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
                    .typeString('<strong>front</strong> end')
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString('open source <strong>enthusiastic</strong>')
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString('typescript lover <span style="color: #2B7489;">:blue_heart:</span>')
                    .start()
            }} />
        </Wrapper>
    )
}

export default withNavigation(Home)
