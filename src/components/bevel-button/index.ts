import Link from 'next/link'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'
import { pressed, raised } from '../../styles/bevel'

const bevelButton = css<{ $compact?: boolean }>`
   display: inline-block;
   font-family: inherit;
   cursor: pointer;
   background: ${theme.colors.bevel};
   white-space: nowrap;
   text-decoration: none;
   font-size: 11px;
   letter-spacing: ${({ $compact }) => ($compact ? 0 : 2)}px;
   padding: ${({ $compact }) => ($compact ? '5px 12px' : '8px 14px')};
   ${raised}

   &,
   &:visited,
   &:hover {
      color: ${theme.colors.dark};
   }

   &:active {
      ${pressed}
   }
`

export const BevelButton = styled.button<{ $compact?: boolean }>`${bevelButton}`

export const BevelLink = styled(Link)<{ $compact?: boolean }>`${bevelButton}`
