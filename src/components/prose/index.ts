import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Prose = styled.div`
   font-family: ${theme.fonts.type};
   font-size: 16px;
   line-height: 1.6;
   color: ${theme.colors.dark};
   overflow-wrap: break-word;

   > :first-child {
      margin-top: 0;
   }

   h1, h2, h3, h4 {
      font-family: ${theme.fonts.mono};
      line-height: 1.2;
      color: ${theme.colors.dark};
      margin: 1.8em 0 0.6em;
   }

   h1 { font-size: 24px; }
   h2 { font-size: 20px; }
   h3 { font-size: 16px; }
   h4 { font-size: 14px; }

   p, ul, ol, blockquote, pre, table {
      margin: 1em 0;
   }

   ul, ol {
      padding-left: 1.6rem;
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

   pre {
      font-size: 13px;
      line-height: 1.5;
   }

   code:not(pre > code) {
      font-size: 0.85em;
      background: ${theme.colors.bevel};
      padding: 1px 5px;
      border: 1px solid ${theme.colors.line};
   }

   table {
      width: 100%;
      font-family: ${theme.fonts.mono};
      font-size: 13px;
   }

   th {
      font-size: 10px;
   }

   img {
      max-width: 100%;
      border: 1.5px solid ${theme.colors.dark};
   }

   img[src$="#gh-dark-mode-only"] {
      display: none;
   }

   hr {
      border: none;
      border-top: 1px solid ${theme.colors.line};
      margin: 1.6em 0;
   }

   [float~="right"] {
      float: right;
      margin-left: 0.5rem;
   }

   [shape~="ellipse"] {
      shape-outside: ellipse();
   }
`
