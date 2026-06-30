'use client'

import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Wrapper = styled.footer`
   border-top: 3px double ${theme.colors.dark};
   background: ${theme.colors.base};
`

const Inner = styled.div`
   max-width: ${theme.global.sizes.maxWidth};
   margin: 0 auto;
   padding: 1.6rem 2rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1rem;
   flex-wrap: wrap;
   font-size: 0.66rem;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: ${theme.colors.muted};
`

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Wrapper>
      <Inner>
        <span>© {year} Pedro Queiroz — set in monospace</span>
        <span>Printed in Brazil</span>
      </Inner>
    </Wrapper>
  )
}
