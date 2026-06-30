import NextLink from 'next/link'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.nav`
   position: sticky;
   top: 0;
   z-index: 50;
   background: ${theme.colors.base};
   border-bottom: 3px double ${theme.colors.dark};
`

export const Inner = styled.div`
   max-width: ${theme.global.sizes.maxWidth};
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1.5rem;
   padding: 1.05rem 2rem;

   @media (max-width: ${theme.global.breakpoints.mobile}px) {
      flex-direction: column;
      gap: 1rem;
   }
`

export const Brand = styled.div`
   display: flex;
   align-items: baseline;
   gap: 0.7rem;
   cursor: pointer;
`

export const BrandName = styled.span`
   font-size: 1.15rem;
   font-weight: 700;
   letter-spacing: 1px;
`

export const BrandBadge = styled.span`
   font-size: 0.62rem;
   letter-spacing: 2px;
   color: ${theme.colors.muted};
   border: 1px solid ${theme.colors.lineStrong};
   padding: 1px 5px;
`

export const Group = styled.div`
   display: flex;
   align-items: center;
   gap: 1.6rem;
   font-size: 0.82rem;
   letter-spacing: 1px;

   @media (max-width: ${theme.global.breakpoints.mobile}px) {
      gap: 1.1rem;
      flex-wrap: wrap;
      justify-content: center;
   }
`

export const NavLink = styled(NextLink)<{ $active?: boolean }>`
   cursor: pointer;
   text-transform: uppercase;
   padding-bottom: 2px;
   border-bottom: 2px solid ${({ $active }) => ($active ? theme.colors.dark : 'transparent')};
   color: ${theme.colors.dark};
`

export const Sep = styled.span`
   width: 1px;
   height: 16px;
   background: ${theme.colors.lineStrong};
`

export const Social = styled.a`
   color: ${theme.colors.muted};
   letter-spacing: 2px;
   cursor: pointer;
`
