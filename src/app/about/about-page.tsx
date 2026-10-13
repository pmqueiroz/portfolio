'use client'

import styled from 'styled-components'
import moment from 'moment'

import { withNavigation } from '../../hocs'
import { theme } from '../../styles/theme'

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: 980px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  width: 100%;
`

const Name = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.6rem;
`

const Bio = styled.div`
  font-family: 'Cutive Mono', monospace;
  font-size: 1.08rem;
  line-height: 1.9;
  color: #37342b;
  max-width: 54ch;

  p {
    margin-bottom: 1.1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .typo {
    text-decoration: underline wavy ${theme.colors.dark};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
`

const Sign = styled.div`
  margin-top: 2.2rem;
  font-family: 'Cutive Mono', monospace;
  font-size: 1.1rem;
`

const Colophon = styled.div`
  margin-top: 3rem;
  border-top: 1px solid ${theme.colors.line};
  padding-top: 1.4rem;
  font-size: 0.74rem;
  letter-spacing: 1px;
  color: ${theme.colors.muted};
  line-height: 2;
`

export const AboutPage = withNavigation(() => {
  const age = moment().diff(moment('04/11/2000', 'MM/DD/YYYY'), 'years')

  return (
    <Wrapper>
      <div>
        <Name>Pedro Queiroz</Name>
        <Bio>
          <p>
            Front-end developer since 2017, {age} years old, living and working in Brazil.
            I care about typography, the feel of an interface, and writing things down.
          </p>
          <p>
            My work tends toward the quiet end of the spectrum: monospaced type, paper tones,
            sharp shadows, and as little chrome as I can get away with. I&rsquo;m a{' '}
            <span className="typo">typescripter</span> and an open-source enthusiast.
          </p>
          <p>
            When I&rsquo;m not shipping, I&rsquo;m usually building something needlessly from
            scratch — a programming language, a CLI, a static-site generator — just to see how
            it works underneath.
          </p>
        </Bio>
        <Sign>— Pedro</Sign>

        <Colophon>
          <div>SET IN — JetBrains Mono &amp; Cutive Mono</div>
          <div>PRINTED ON — paper #f1ede3, ink #17150f</div>
          <div>FIND ME — github · linkedin · contact@pmqueiroz.dev</div>
        </Colophon>
      </div>
    </Wrapper>
  )
})
