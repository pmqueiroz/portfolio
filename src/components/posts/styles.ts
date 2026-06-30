import styled from 'styled-components'
import NextLink from 'next/link'
import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
   width: 100%;
   margin-bottom: 4rem;
`

export const Back = styled(NextLink)`
   display: block;
   max-width: 1100px;
   margin: 0 auto;
   padding: 0 2rem 1rem;
   font-size: 0.72rem;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: ${theme.colors.muted};
`

export const Header = styled.header`
   max-width: 760px;
   margin: 0 auto;
   padding: 1.5rem 2rem 2.5rem;
   text-align: center;
   border-bottom: 3px double ${theme.colors.dark};

   h1 {
      font-size: clamp(2rem, 5vw, 3.1rem);
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.5px;
   }
`

export const Kicker = styled.div`
   font-size: 0.66rem;
   letter-spacing: 4px;
   text-transform: uppercase;
   color: ${theme.colors.muted};
   margin-bottom: 1.2rem;
`

export const Lede = styled.p`
   font-family: 'Cutive Mono', monospace;
   font-size: 1rem;
   color: ${theme.colors.subtext};
   margin-top: 1.3rem;
`

export const Layout = styled.div`
   max-width: 1100px;
   margin: 0 auto;
   padding: 3rem 2rem 6rem;
   display: grid;
   grid-template-columns: 200px minmax(0, 1fr);
   gap: 3.5rem;

   @media (max-width: ${theme.global.breakpoints.mobile}px) {
      grid-template-columns: 1fr;
   }
`

export const Summary = styled.aside`
   font-size: 0.78rem;

   .sticky {
      position: sticky;
      top: 8rem;
   }

   .label {
      font-size: 0.62rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      margin-bottom: 1rem;
      border-bottom: 1px solid ${theme.colors.line};
      padding-bottom: 0.6rem;
   }

   ol {
      list-style: none;
   }

   li {
      margin-bottom: 0.7rem;
      line-height: 1.4;
      color: #57534a;
      cursor: pointer;

      &:hover {
         color: ${theme.colors.dark};
      }

      .num {
         color: #a89f8b;
         margin-right: 0.5rem;
      }
   }

   @media (max-width: ${theme.global.breakpoints.mobile}px) {
      display: none;
   }
`

export const ChapterTitleWrapper = styled.div`
   scroll-margin-top: 8rem;

   h2 {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 3rem 0 0.4rem;
      display: flex;
      align-items: baseline;
      gap: 0.8rem;

      .num {
         font-size: 0.85rem;
         color: #a89f8b;
      }
   }

   .rule {
      height: 2px;
      background: ${theme.colors.dark};
      margin-bottom: 1.4rem;
   }

   &:first-child h2 {
      margin-top: 0;
   }
`

export const Content = styled.article`
  max-width: 70ch;
  line-height: 1.9;

  p {
     font-family: 'Cutive Mono', monospace;
     font-size: 1.06rem;
     color: #2b2820;
     margin: 1.1rem 0;
  }

  s {
      color: ${theme.colors.muted};
  }

  strong {
    background: ${theme.colors.highlight};
    padding: 0 3px;
  }

  a {
     text-decoration: underline;
     text-underline-offset: 3px;
  }

  ul, ol {
     font-family: 'Cutive Mono', monospace;
     font-size: 1.02rem;
     line-height: 1.8;
     color: #2b2820;
     margin: 1.1rem 0;
     padding-left: 1.6rem;
  }

  blockquote {
     margin: 1.8rem 0;
     font-family: 'Cutive Mono', monospace;
     font-size: 1.08rem;
     line-height: 1.7;
  }

  pre {
     overflow-x: auto;
     max-width: 100%;
     margin: 1.6rem 0;
  }

  code:not(pre > code) {
      background: ${theme.colors.lightGray};
      padding: 1px 5px;
      border: 1px solid #d3cab4;
  }

  table {
     width: 100%;
     margin: 1.4rem 0;
     font-size: 0.9rem;
  }

  img {
      max-width: 100%;
      border: 1.5px solid ${theme.colors.dark};
  }

  [float~="right"] {
     float: right;
     margin-left: 0.5rem;
  }

  [shape~="ellipse"] {
      shape-outside: ellipse();
  }
`
