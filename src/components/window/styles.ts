import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { pressed, raised, sunken } from '../../styles/bevel'

const narrow = `@media (max-width: ${theme.global.breakpoints.narrow - 1}px)`

export const Backdrop = styled.div`
   position: fixed;
   inset: 0;
   background: ${theme.colors.backdrop};
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 32px;
   z-index: 10;

   ${narrow} {
      padding: 0;
   }
`

export const Frame = styled.div<{ $floating: boolean }>`
   width: 100%;
   max-width: ${theme.global.sizes.windowWidth};
   max-height: 100%;
   ${({ $floating }) => $floating && `
      position: absolute;
      max-height: calc(100% - 32px);
   `}
   display: flex;
   flex-direction: column;
   background: ${theme.colors.bevel};
   padding: 3px;
   ${raised}
   box-shadow: inset -1px -1px 0 ${theme.colors.shadow}, inset 1px 1px 0 ${theme.colors.paper};

   ${narrow} {
      height: 100%;
   }
`

export const TitleBar = styled.div<{ $draggable: boolean }>`
   background: ${theme.gradients.window};
   cursor: ${({ $draggable }) => ($draggable ? 'move' : 'default')};
   touch-action: none;
   user-select: none;
   color: ${theme.colors.card};
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 4px 6px;
   font-size: 12px;
   font-weight: 700;
   gap: 8px;

   h2 {
      font-size: inherit;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
`

export const Close = styled.button`
   font-family: inherit;
   cursor: pointer;
   width: 18px;
   height: 16px;
   padding: 0;
   background: ${theme.colors.bevel};
   color: ${theme.colors.dark};
   font-size: 11px;
   font-weight: 700;
   line-height: 1;
   border: 1px solid;
   border-color: ${theme.colors.card} ${theme.colors.dark} ${theme.colors.dark} ${theme.colors.card};

   &:active {
      ${pressed}
      box-shadow: none;
   }
`

export const Viewport = styled.div`
   margin: 6px 4px;
   background: ${theme.colors.card};
   ${sunken}
   box-shadow: inset 1px 1px 0 ${theme.colors.dark};
   padding: 22px;
   overflow: auto;
   flex: 1;
   min-height: 0;

   ${narrow} {
      padding: 16px;
   }
`

export const StatusBar = styled.div`
   display: grid;
   grid-template-columns: minmax(0, 1fr) auto;
   gap: 2px;
   font-size: 11px;

   span {
      ${sunken}
      padding: 2px 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
`

export const Kicker = styled.div`
   font-family: ${theme.fonts.mono};
   font-size: 11px;
   letter-spacing: 2px;
   color: ${theme.colors.subtext};
   text-transform: uppercase;
`
