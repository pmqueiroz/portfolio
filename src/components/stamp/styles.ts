import styled from 'styled-components'
import { theme } from '../../styles/theme'

type Size = 'featured' | 'full'

const sizes = {
  featured: { width: 164, pad: 10, face: 100, glyph: 30, name: 13, lines: 2, shadow: 4 },
  full: { width: 180, pad: 11, face: 104, glyph: 32, name: 14, lines: 3, shadow: 5 }
}

export const Stamp = styled.button<{ $size: Size }>`
   position: relative;
   display: block;
   cursor: pointer;
   text-align: left;
   width: ${({ $size }) => sizes[$size].width}px;
   background: ${theme.colors.paper};
   padding: ${({ $size }) => sizes[$size].pad}px;
   filter: drop-shadow(${({ $size }) => `${sizes[$size].shadow}px ${sizes[$size].shadow}px`} 0 ${theme.colors.shadow});
`

export const Face = styled.span<{ $size: Size }>`
   position: relative;
   display: block;
   height: ${({ $size }) => sizes[$size].face}px;
   border: 1.5px solid ${theme.colors.dark};
   overflow: hidden;
`

export const Glyph = styled.span<{ $size: Size }>`
   position: absolute;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: ${({ $size }) => sizes[$size].glyph}px;
   font-weight: 700;
`

export const Denom = styled.span`
   position: absolute;
   top: 5px;
   right: 7px;
   font-size: 11px;
   font-weight: 700;
`

export const Status = styled.span`
   position: absolute;
   left: 6px;
   bottom: 5px;
   font-size: 9px;
   background: ${theme.colors.card};
   padding: 0 3px;
`

export const Name = styled.span<{ $size: Size }>`
   display: block;
   font-size: ${({ $size }) => sizes[$size].name}px;
   font-weight: 700;
   margin-top: ${({ $size }) => ($size === 'full' ? 7 : 6)}px;
   overflow-wrap: anywhere;
`

export const Blurb = styled.span<{ $size: Size }>`
   font-family: ${theme.fonts.type};
   font-size: 11px;
   color: ${theme.colors.subtext};
   line-height: 15px;
   display: -webkit-box;
   -webkit-line-clamp: ${({ $size }) => sizes[$size].lines};
   -webkit-box-orient: vertical;
   overflow: hidden;
   min-height: ${({ $size }) => ($size === 'full' ? sizes.full.lines * 15 : 0)}px;
`

export const Foot = styled.span`
   font-size: 9px;
   letter-spacing: 2px;
   color: ${theme.colors.muted};
   border-top: 1px dashed ${theme.colors.dashed};
   margin-top: 6px;
   padding-top: 5px;
   display: flex;
   justify-content: space-between;
`

const hole = (pos: string) =>
  `radial-gradient(circle 4px,${theme.colors.card} 96%,#0000) ${pos}`

export const Perforation = styled.span`
   position: absolute;
   inset: 0;
   pointer-events: none;
   background:
      ${hole('0 -4px/10px 10px repeat-x')},
      ${hole('0 calc(100% + 4px)/10px 10px repeat-x')},
      ${hole('-4px 0/10px 10px repeat-y')},
      ${hole('calc(100% + 4px) 0/10px 10px repeat-y')};
`
