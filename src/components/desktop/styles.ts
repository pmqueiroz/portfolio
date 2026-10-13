import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Panel } from '../panel'

const narrow = `@media (max-width: ${theme.global.breakpoints.narrow - 1}px)`

export const Screen = styled.div`
   padding: 40px 16px;
   display: flex;
   justify-content: center;
   min-height: 100vh;

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
   border-bottom: 3px double ${theme.colors.dark};
`

export const Handle = styled.h1`
   font-size: 40px;
   font-weight: 700;
   letter-spacing: -1.5px;
   line-height: 1;
   min-height: 1em;
`

export const Cursor = styled.span`
   animation: blink 1s infinite;
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

export const Stamps = styled.div`
   display: flex;
   gap: 18px;
   padding: 20px 14px;
   justify-content: center;
   flex-wrap: wrap;
   min-height: 120px;
`

export const Footer = styled.footer`
   border-top: 3px double ${theme.colors.dark};
   padding: 12px 20px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 12px;
   flex-wrap: wrap;

   .notice {
      font-size: 10px;
      letter-spacing: 2px;
      color: ${theme.colors.subtext};
   }
`

export const Badges = styled.div`
   display: flex;
   gap: 6px;
   flex-wrap: wrap;
`

export const Badge = styled.span`
   width: 88px;
   height: 31px;
   border: 1px solid ${theme.colors.dark};
   display: grid;
   grid-template-columns: 30px 1fr;
   font-size: 8px;
   font-weight: 700;
   letter-spacing: 0.5px;
   line-height: 1.1;

   span {
      display: flex;
      align-items: center;
   }

   span:first-child {
      background: ${theme.colors.dark};
      color: ${theme.colors.card};
      justify-content: center;
   }

   span:last-child {
      padding: 0 4px;
      background: ${theme.colors.card};
   }
`
