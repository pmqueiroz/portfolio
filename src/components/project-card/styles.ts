import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Stamp = styled.div`
   position: relative;
   cursor: pointer;
   width: 250px;
   background: ${theme.colors.card};
   padding: 14px;
   filter: drop-shadow(6px 6px 0 ${theme.colors.shadow});
`

export const Face = styled.div`
   position: relative;
   height: 160px;
   border: 1.5px solid ${theme.colors.dark};
   overflow: hidden;
`

export const TitleRow = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: baseline;
   margin-top: 10px;
`

export const Name = styled.span`
   font-size: 1.05rem;
   font-weight: 700;
`

export const Denom = styled.span`
   font-size: 1rem;
   font-weight: 700;
   border: 1.5px solid ${theme.colors.dark};
   padding: 0 5px;
`

export const Blurb = styled.p<{ $lines: number }>`
   font-family: 'Cutive Mono', monospace;
   font-size: 0.78rem;
   line-height: 1.45;
   color: ${theme.colors.subtext};
   margin-top: 5px;
   height: ${({ $lines }) => $lines * 1.45}em;
   overflow: hidden;
`

export const FootRow = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 8px;
   border-top: 1px dashed #c4baa3;
   padding-top: 7px;
   font-size: 0.62rem;
   letter-spacing: 2px;
   color: ${theme.colors.muted};
   text-transform: uppercase;
`

const hole = (pos: string) =>
  `radial-gradient(circle 6px at center,${theme.colors.base} 96%,#0000) ${pos}`

export const Perforation = styled.div`
   position: absolute;
   inset: 0;
   pointer-events: none;
   background:
      ${hole('0 -6px/15px 15px repeat-x')},
      ${hole('0 calc(100% + 6px)/15px 15px repeat-x')},
      ${hole('-6px 0/15px 15px repeat-y')},
      ${hole('calc(100% + 6px) 0/15px 15px repeat-y')};
`

export const Peel = styled.div<{ $size: number }>`
   position: absolute;
   top: -1px;
   right: -1px;
   width: ${({ $size }) => $size}px;
   height: ${({ $size }) => $size}px;
   clip-path: polygon(100% 0, 0 0, 100% 100%);
   background: linear-gradient(225deg, #f4eee0 0%, #e2d8c2 50%, #c5bb9f 100%);
   filter: drop-shadow(-3px 4px 3px rgba(0, 0, 0, 0.3));
   transition: width 0.4s cubic-bezier(.45, .05, .3, 1), height 0.4s cubic-bezier(.45, .05, .3, 1);
   pointer-events: none;
   z-index: 6;
`
