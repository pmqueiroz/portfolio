import NextLink, { LinkProps } from 'next/link'
import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.nav`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 100vw;
   padding: 2rem 3.5rem;
`

export const Logo = styled.h1`
   font-size: 3rem;
   font-weight: 700;
   text-transform: uppercase;
`

export const LinkGroup = styled.section<{ space: string }>`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: ${({ space }) => space};   
`

export const _Link = styled.span`
   a {
      font-size: 1.5rem;
      font-weight: 700;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.dark};
      cursor: pointer;
   }
`

export const Link = ({ children, ...linkProps}: React.PropsWithChildren<LinkProps>) => {
   return (
      <_Link>
         <NextLink {...linkProps}>
            {children}
         </NextLink>
      </_Link>
   )
}

export const ExternalLink = styled.a`
   svg {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.dark};
   }
`