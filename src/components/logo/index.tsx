import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'

const shine = keyframes`
   0%, 60% { background-position: -160px 0 }
   100% { background-position: 360px 0 }
`

const bob = keyframes`
   0%, 100% { transform: rotate(-8deg) scale(1) }
   50% { transform: rotate(-8deg) scale(1.08) }
`

const Mark = styled.h1`
   position: relative;
   display: inline-flex;
   align-items: baseline;
   gap: 2px;
   min-height: 46px;
   font-family: 'Arial Black', Impact, sans-serif;
   font-style: italic;
   line-height: 1;
`

const Name = styled.span`
   font-size: 46px;
   font-weight: 900;
   letter-spacing: -2px;
   background: ${theme.gradients.wordArt};
   -webkit-background-clip: text;
   background-clip: text;
   color: transparent;
   -webkit-text-stroke: 1.5px #0a1a4a;
   filter: drop-shadow(3px 3px 0 ${theme.colors.dark});
`

const Suffix = styled.span`
   font-size: 22px;
   font-weight: 900;
   color: #ff7a00;
   -webkit-text-stroke: 1px ${theme.colors.dark};
   filter: drop-shadow(2px 2px 0 ${theme.colors.dark});
`

const Shine = styled.span`
   position: absolute;
   inset: 0;
   pointer-events: none;
   background: linear-gradient(100deg, transparent 40%, #ffffffcc 50%, transparent 60%) no-repeat;
   background-size: 160px 100%;
   mix-blend-mode: overlay;
   animation: ${shine} 3.5s infinite;
`

const Sticker = styled.span`
   position: absolute;
   top: -12px;
   right: -34px;
   background: ${theme.colors.sun};
   color: ${theme.colors.alarm};
   font-size: 10px;
   font-style: normal;
   font-weight: 900;
   padding: 3px 6px;
   border: 1.5px solid ${theme.colors.dark};
   border-radius: 50%;
   animation: ${bob} 1.6s ease-in-out infinite;
`

interface LogoProps {
   name: string
   typed: string
   suffix: string
   flashy: boolean
}

export const Logo = ({ name, typed, suffix, flashy }: LogoProps) => (
  <Mark aria-label={`${name}${suffix}`}>
    <Name aria-hidden>{typed}</Name>
    {typed === name && <Suffix aria-hidden>{suffix}</Suffix>}
    {flashy && <Shine aria-hidden />}
    {flashy && <Sticker aria-hidden>v2.0!</Sticker>}
  </Mark>
)
