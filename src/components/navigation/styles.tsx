import NextLink, { LinkProps } from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.nav`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 100vw;
   height: ${({ theme }) => theme.global.sizes.navigationHeight};
   padding: 2rem 3.5rem;
`

export const MenuWrapper = styled.nav<{ isOpen: boolean }>`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;

   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 5rem;
   width: 100vw;
   height: 100vh;
   background: ${theme.colors.base};
   padding: 2rem 3.5rem;

   display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
`

export const Logo = styled.span`
   font-size: 2rem;
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
   }
   
   * {
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