'use client'

import styled from 'styled-components'

import { Window } from '../../components/window'
import { theme } from '../../styles/theme'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: ${theme.fonts.type};
  font-size: 16px;
  line-height: 1.6;

  h1 {
    font-family: ${theme.fonts.mono};
    font-size: 28px;
  }

  .typo {
    text-decoration: underline wavy ${theme.colors.dark};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
`

const Sign = styled.div`
  font-size: 26px;
  font-style: italic;
`

export const ColophonWindow = ({ age }: { age: number }) => {
  return (
    <Window title="about me" section="about" path="/about">
      <Body>
        <h1>About me</h1>
        <p>
          I&rsquo;m Pedro Queiroz, a front-end developer from Brazil, {age} years old, writing
          software professionally since 2017.
        </p>
        <p>
          I like <span className="typo">typescript</span>, open source, and building tools from
          scratch — most recently Umbra, a small programming language.
        </p>
        <Sign>— pmq</Sign>
      </Body>
    </Window>
  )
}
