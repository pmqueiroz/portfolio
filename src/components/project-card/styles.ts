import styled from 'styled-components'
import { raised, pressed, sunken } from '../../styles/bevel'
import { theme } from '../../styles/theme'

export const Card = styled.button`
   display: flex;
   flex-direction: column;
   gap: 8px;
   width: 200px;
   padding: 10px;
   text-align: left;
   cursor: pointer;
   font-family: inherit;
   color: ${theme.colors.dark};
   background: ${theme.colors.bevel};
   ${raised}

   &:active {
      ${pressed}
   }

   &:focus-visible {
      outline: 1px dotted ${theme.colors.dark};
      outline-offset: -5px;
   }
`

export const Head = styled.span`
   display: flex;
   align-items: center;
   gap: 8px;
`

export const Icon = styled.span`
   flex: none;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;
   color: ${theme.colors.card};
   font-size: 13px;
   font-weight: 700;
   ${sunken}
`

export const Name = styled.span<{ $visited: boolean }>`
   font-size: 13px;
   font-weight: 700;
   overflow-wrap: anywhere;
   color: ${({ $visited }) => ($visited ? theme.colors.linkVisited : theme.colors.link)};
   text-decoration: underline;
`

export const Blurb = styled.span`
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
   overflow: hidden;
   min-height: 45px;
   padding: 4px 6px;
   font-family: ${theme.fonts.type};
   font-size: 11px;
   line-height: 15px;
   color: ${theme.colors.subtext};
   background: ${theme.colors.card};
   ${sunken}
`

export const Foot = styled.span`
   display: flex;
   justify-content: space-between;
   font-size: 9px;
   letter-spacing: 2px;
   color: ${theme.colors.subtext};
`
