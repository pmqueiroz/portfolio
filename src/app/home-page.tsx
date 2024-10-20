'use client'

import Typewriter from 'typewriter-effect'
import styled from 'styled-components'

import { WithMenuNavigationProps, withNavigation } from '../hocs'
import { theme } from '../styles/theme'
import { If, Then } from 'react-if'

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

  @media (max-width: ${theme.global.breakpoints.mobile + 'px'}) {
    font-size: 4rem;
  }
`

export const HomePage = withNavigation((props: WithMenuNavigationProps) => {
  const { isMenuOpen } = props

  return (
    <Wrapper>
      <Title>
        <If condition={!isMenuOpen}>
          <Then>
            <Typewriter onInit={(typewriter) => {
              typewriter
                .typeString('pmqueiroz')
                .start()
            }} />
          </Then>
        </If>
      </Title>
      <If condition={!isMenuOpen}>
        <Then>
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
        </Then>
      </If>
    </Wrapper>
  )
})
