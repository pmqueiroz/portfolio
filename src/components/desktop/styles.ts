import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'
import { pressed, raised } from '../../styles/bevel'
import { BevelButton } from '../bevel-button'
import { Panel } from '../panel'

const scroll = keyframes`
   from { transform: translateX(0); }
   to { transform: translateX(-100%); }
`

const narrow = `@media (max-width: ${theme.global.breakpoints.narrow - 1}px)`

export const Screen = styled.div`
   padding: 40px 16px;
   display: flex;
   justify-content: center;
   min-height: 100vh;
   background: ${theme.colors.desktop};

   ${narrow} {
      padding: 0;
   }
`

export const Page = styled.div`
   width: 100%;
   max-width: ${theme.global.sizes.pageWidth};
   background: ${theme.colors.card};
   border: 1px solid ${theme.colors.dark};
   box-shadow: 6px 6px 0 ${theme.colors.shadow};
   align-self: flex-start;
`

export const Header = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
   gap: 12px;
   flex-wrap: wrap;
   padding: 22px 20px 14px;
   background: ${theme.gradients.header};
   border-bottom: 3px double ${theme.colors.dark};
`

export const Ticker = styled.div`
   background: ${theme.colors.alarm};
   color: ${theme.colors.sun};
   font-size: 12px;
   font-weight: 700;
   padding: 5px 12px;
   border-bottom: 2px solid ${theme.colors.dark};
   white-space: nowrap;
   overflow: hidden;

   span {
      display: inline-block;
      padding-left: 100%;
      animation: ${scroll} 22s linear infinite;
   }

   &:hover span {
      animation-play-state: paused;
   }

   @media (prefers-reduced-motion: reduce) {
      text-overflow: ellipsis;

      span {
         display: inline;
         padding-left: 0;
      }
   }
`

export const Tagline = styled.div`
   font-family: ${theme.fonts.type};
   font-size: 15px;
   color: ${theme.colors.subtext};
   margin-top: 6px;
   min-height: 1.4em;
`

export const Crumbs = styled.div`
   font-size: 11px;
   color: ${theme.colors.subtext};
   line-height: 1.6;
   white-space: nowrap;

   b {
      color: ${theme.colors.dark};
   }
`

export const Columns = styled.div`
   display: grid;
   grid-template-columns: 170px minmax(0, 1fr);

   ${narrow} {
      grid-template-columns: 1fr;
   }
`

export const Aside = styled.aside`
   border-right: 1px solid ${theme.colors.line};
   border-bottom: 1px solid ${theme.colors.line};
   padding: 14px 12px;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   gap: 16px;
   font-size: 12px;

   ${narrow} {
      flex-direction: row;
   }
`

export const SideBox = styled(Panel)`
   flex: 0 0 auto;
   min-width: 140px;

   ${narrow} {
      flex: 1;
   }
`

export const LinkList = styled.nav`
   display: flex;
   flex-direction: column;
   padding: 6px 0;

   a,
   span {
      padding: 4px 8px;
   }
`

export const Current = styled.span`
   background: ${theme.colors.highlight};
   font-weight: 700;
`

export const Favorites = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   align-items: center;

   span {
      font-size: 11px;
      font-weight: 700;
      color: ${theme.colors.alarm};
      text-align: center;
   }
`

export const ReadingToggle = styled(BevelButton)`
   font-size: 10px;
   font-weight: 700;
   letter-spacing: 1px;
   padding: 6px 8px;
   text-align: left;
   line-height: 1.4;
   white-space: normal;
`

export const Counter = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
   align-items: flex-start;

   .label {
      font-size: 10px;
      letter-spacing: 2px;
      color: ${theme.colors.subtext};
   }

   .digits {
      display: flex;
      gap: 2px;
   }

   .digit {
      background: ${theme.colors.dark};
      color: ${theme.colors.counter};
      font-weight: 700;
      font-size: 14px;
      width: 14px;
      text-align: center;
      padding: 2px 0;
   }
`

export const Main = styled.main`
   padding: 18px;
   display: flex;
   flex-direction: column;
   gap: 18px;
   min-width: 0;
`

export const Gallery = styled.div`
   display: flex;
   gap: 8px;
   flex-wrap: wrap;
`

export const Announcement = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   flex-wrap: wrap;
   background: ${theme.colors.highlighter};
   border: 2px solid ${theme.colors.dark};
   padding: 8px 12px;

   strong {
      font-size: 20px;
      color: ${theme.colors.alarm};
   }

   span {
      font-family: ${theme.fonts.type};
      font-size: 14px;
   }

   a,
   a:visited {
      font-weight: 700;
      color: ${theme.colors.navy};
   }
`

export const Intro = styled.p`
   font-family: ${theme.fonts.type};
   font-size: 16px;
   line-height: 1.5;
`

export const Actions = styled.div`
   display: flex;
   gap: 12px;
   flex-wrap: wrap;
`

export const Featured = styled.div`
   display: flex;
   flex-direction: column;
   background: #fffef2;
`

export const FeaturedRow = styled.div<{ $thumb: boolean }>`
   display: grid;
   grid-template-columns: ${({ $thumb }) => ($thumb ? '64px minmax(0, 1fr)' : 'minmax(0, 1fr)')};
   gap: 12px;
   padding: 10px 12px;
   align-items: center;

   & + & {
      border-top: 1px dotted ${theme.colors.shadow};
   }
`

export const FeaturedName = styled.span`
   display: block;
   font-size: 14px;
   font-weight: 700;
   overflow-wrap: anywhere;

   .bullet {
      color: ${theme.colors.alarm};
   }

   .lang {
      font-size: 10px;
      font-weight: 400;
      color: ${theme.colors.green};
   }
`

export const FeaturedBlurb = styled.span`
   display: block;
   margin-top: 2px;
   font-family: ${theme.fonts.type};
   font-size: 13px;
   color: ${theme.colors.subtext};
`

export const Guestbook = styled.div`
   display: flex;
   justify-content: center;
   gap: 12px;
   align-items: center;
   flex-wrap: wrap;
   padding: 14px;
   border-top: 1px solid ${theme.colors.dark};
   background: ${theme.colors.sky};

   .sign,
   .sign:visited {
      font-size: 16px;
      font-weight: 700;
      color: ${theme.colors.navy};
   }
`

export const Ad = styled.a`
   width: 340px;
   max-width: 100%;
   height: 60px;
   border: 2px outset ${theme.colors.outset};
   background: ${theme.gradients.ad};
   display: grid;
   grid-template-columns: auto 1fr auto;
   align-items: center;
   gap: 10px;
   padding: 0 10px;
   text-decoration: none;
   font-family: Verdana, Tahoma, sans-serif;

   &,
   &:visited,
   &:hover {
      color: ${theme.colors.paper};
   }

   .free {
      background: ${theme.colors.sun};
      color: ${theme.colors.alarm};
      font-weight: 900;
      font-size: 13px;
      padding: 4px 6px;
      transform: rotate(-6deg);
   }

   .copy {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
      font-size: 10px;

      b {
         font-size: 13px;
      }
   }

   .cta {
      background: ${theme.colors.bevel};
      color: ${theme.colors.dark};
      font-size: 10px;
      font-weight: 700;
      padding: 4px 8px;
      ${raised}
   }

   &:active .cta {
      ${pressed}
   }
`

export const Footer = styled.footer`
   background: ${theme.gradients.footer};
   border-top: 3px double ${theme.colors.dark};
   padding: 14px 20px;
   display: flex;
   flex-direction: column;
   gap: 12px;
   align-items: center;
   text-align: center;

   .notice {
      font-size: 10px;
      letter-spacing: 1px;
      color: ${theme.colors.subtext};
      line-height: 1.7;
   }
`

export const Webring = styled.nav`
   font-size: 12px;
   display: flex;
   gap: 8px;
   flex-wrap: wrap;
   justify-content: center;

   .ring {
      color: ${theme.colors.subtext};
   }

   .sep {
      margin-right: 8px;
   }
`

export const Badges = styled.div`
   display: flex;
   gap: 6px;
   flex-wrap: wrap;
   justify-content: center;
`

export const Badge = styled.span`
   width: 88px;
   height: 31px;
   border: 1px solid ${theme.colors.dark};
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   line-height: 1.15;

   .top {
      font-size: 7px;
      letter-spacing: 1px;
      color: ${theme.colors.dark};
   }

   .main {
      font-size: 11px;
      font-weight: 700;
   }
`
