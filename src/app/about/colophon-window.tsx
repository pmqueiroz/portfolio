'use client'

import styled from 'styled-components'

import { Panel } from '../../components/panel'
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

const Facts = styled.dl`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 6px 12px;
  padding: 10px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;

  dt {
    color: ${theme.colors.subtext};
  }
`

export const ColophonWindow = ({ age }: { age: number }) => {
  return (
    <Window title="colophon" section="colophon" path="/about">
      <Body>
        <h1>Colophon</h1>
        <p>
          I&rsquo;m Pedro Queiroz, a front-end developer from Brazil, {age} years old, writing
          software professionally since 2017.
        </p>
        <p>
          I like <span className="typo">typescript</span>, open source, and building tools from
          scratch — most recently Umbra, a small programming language.
        </p>
        <p>This site is hand-built and set entirely in monospace.</p>
        <Sign>— pmq</Sign>
        <Panel title="About this site">
          <Facts>
            <dt>TYPE</dt><dd>JetBrains Mono, Cutive Mono</dd>
            <dt>PAPER</dt><dd>{theme.colors.base} / {theme.colors.card}</dd>
            <dt>INK</dt><dd>{theme.colors.dark}</dd>
            <dt>CONTACT</dt><dd><a href="mailto:contact@pmqueiroz.dev">contact@pmqueiroz.dev</a></dd>
          </Facts>
        </Panel>
      </Body>
    </Window>
  )
}
