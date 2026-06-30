import { createGlobalStyle } from 'styled-components'
import { theme } from '../styles/theme'

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'JetBrains Mono', monospace;
   }

   html {
      scroll-behavior: smooth;
   }

   code {
      font-family: 'JetBrains Mono'!important;
   }

   body,
   input,
   button,
   textarea {
      font: 400 1rem 'JetBrains Mono';
      border: none;
      background: none;
   }

   body {
      background: ${theme.colors.base};
      color: ${theme.colors.dark};
      background-image: repeating-linear-gradient(0deg, #00000005 0 1px, transparent 1px 4px);
   }

   ::selection {
      background: ${theme.colors.selection};
      color: ${theme.colors.dark};
   }

   @keyframes blink {
      0%, 49% { opacity: 1 }
      50%, 100% { opacity: 0 }
   }

   div[align="center"] {
      width: 100%;

      p {
         width: 100%;
      }
   }

   table {
      border-collapse: collapse;
   }

   table th, table td {
      padding: 7px 12px;
      border: 1.5px solid ${theme.colors.dark};
   }

   table th {
      background: ${theme.colors.dark};
      color: ${theme.colors.base};
      text-align: left;
      font-size: 0.66rem;
      letter-spacing: 2px;
      text-transform: uppercase;
   }

   a {
      color: ${theme.colors.dark};
      text-decoration: none;
   }

   a:hover {
      text-decoration: none;
      cursor: pointer;
   }

   :root {
      --image-size-normal: 200px;
      --image-size-default: 300px;
   }

   @media (max-width: 1000px) {
      :root{
        font-size: 62.5%;

        --image-size-normal: 150px;
        --image-size-default: 250px;
      }
   }

   // code — printed feel, syntax via weight not hue

   pre {
     border: 1.5px solid ${theme.colors.dark}!important;
     border-radius: 0!important;
     background: ${theme.colors.card}!important;
     box-shadow: 6px 6px 0 0 ${theme.colors.shadow}!important;
     padding: 14px 16px!important;

     color: ${theme.colors.dark}!important;
     text-shadow: none!important;
     max-width: 100%!important;
     overflow-x: auto!important;
   }

   code {
      color: ${theme.colors.dark}!important;
      text-shadow: none!important;
   }

   blockquote {
      position: relative;
      padding-left: 1.6rem;
      border-left: 3px solid ${theme.colors.dark};
      font-style: italic;
      color: ${theme.colors.subtext};
   }

   .token {
      &.comment, &.prolog, &.doctype, &.cdata {
         color: ${theme.colors.muted};
         font-style: italic;
      }

      &.keyword, &.builtin, &.atrule, &.important {
         font-weight: 700;
      }

      &.string, &.char, &.attr-value, &.inserted {
         text-decoration: underline;
         text-decoration-color: ${theme.colors.shadow};
         text-underline-offset: 2px;
      }

      &.operator, &.entity, &.url, &.variable, &.punctuation,
      &.selector, &.attr-name, &.function, &.class-name {
         color: ${theme.colors.dark};
      }
   }
`
