import Link from 'next/link'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

const { bevel, card, dark, shadow, lightGray } = theme.colors

const edges = css`
   border: 1px solid;
   border-color: ${card} ${dark} ${dark} ${card};
   box-shadow: inset -1px -1px 0 ${shadow}, inset 1px 1px 0 ${lightGray};
`

const bevelButton = css<{ $default?: boolean }>`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 6px;
   min-width: 75px;
   padding: 4px 14px;
   font-family: inherit;
   font-size: 12px;
   line-height: 1.3;
   white-space: nowrap;
   text-decoration: none;
   cursor: pointer;
   background: ${bevel};
   ${edges}
   ${({ $default }) => $default && css`
      outline: 1px solid ${dark};
      outline-offset: 0;
   `}

   &,
   &:visited,
   &:hover {
      color: ${dark};
   }

   &:focus-visible {
      outline: 1px dotted ${dark};
      outline-offset: -5px;
   }

   &:active {
      border-color: ${dark};
      box-shadow: inset 1px 1px 0 ${shadow};
      padding: 5px 13px 3px 15px;
   }
`

export const BevelButton = styled.button<{ $default?: boolean }>`${bevelButton}`

export const BevelLink = styled(Link)<{ $default?: boolean }>`${bevelButton}`
