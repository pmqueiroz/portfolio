import Link from 'next/link'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'
import { raised, sunken } from '../../styles/bevel'

export const Bar = styled.div`
   display: flex;
   align-items: center;
   gap: 2px;
   padding: 2px 4px;
   font-size: 12px;
   border-bottom: 1px solid ${theme.colors.shadow};
`

export const Menus = styled.div`
   display: flex;
   gap: 2px;
`

export const Slot = styled.div`
   position: relative;
`

export const Trigger = styled.button<{ $open: boolean }>`
   font-family: inherit;
   font-size: inherit;
   cursor: pointer;
   color: ${theme.colors.dark};
   background: none;
   padding: 2px 7px;
   border: 1px solid transparent;

   &:hover {
      ${({ $open }) => !$open && css`border-color: ${theme.colors.card} ${theme.colors.shadow} ${theme.colors.shadow} ${theme.colors.card};`}
   }

   ${({ $open }) => $open && sunken}
`

export const Aside = styled.span`
   margin-left: auto;
   padding-left: 8px;
   font-family: ${theme.fonts.mono};
   font-size: 10px;
   letter-spacing: 1px;
   color: ${theme.colors.subtext};
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`

export const Dropdown = styled.div`
   position: absolute;
   top: 100%;
   left: 0;
   z-index: 20;
   min-width: 190px;
   display: flex;
   flex-direction: column;
   padding: 2px;
   background: ${theme.colors.bevel};
   ${raised}
   box-shadow: inset -1px -1px 0 ${theme.colors.shadow}, inset 1px 1px 0 ${theme.colors.paper}, 2px 2px 0 ${theme.colors.dark};
`

const item = css`
   display: grid;
   grid-template-columns: 14px 1fr auto;
   gap: 6px;
   align-items: center;
   width: 100%;
   padding: 3px 10px 3px 4px;
   font-family: inherit;
   font-size: 12px;
   text-align: left;
   text-decoration: none;
   white-space: nowrap;
   cursor: pointer;
   background: none;
   border: none;

   &,
   &:visited {
      color: ${theme.colors.dark};
   }

   &:hover,
   &:focus-visible {
      outline: none;
      background: ${theme.colors.navy};
      color: ${theme.colors.card};
   }

   .shortcut {
      padding-left: 18px;
   }
`

export const ItemButton = styled.button`${item}`

export const ItemLink = styled(Link)`${item}`

export const ItemAnchor = styled.a`${item}`

export const Separator = styled.hr`
   margin: 3px 2px;
   border: none;
   border-top: 1px solid ${theme.colors.shadow};
   border-bottom: 1px solid ${theme.colors.paper};
`
