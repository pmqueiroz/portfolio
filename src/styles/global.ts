import { createGlobalStyle } from 'styled-components'
import { theme } from '../styles/theme'

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'JetBrains Mono', monospace;
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

   div[align="center"] {
      width: 100%;
      
      p {
         width: 100%;
      }
   }

   table th, table td {
      padding: 6px 13px;
      border-collapse: collapse;
      border: 1px solid ${theme.colors.dark};
   }

   body {
      background: ${theme.colors.base};
      color: ${theme.colors.dark};
   }

   a {
      color: ${theme.colors.dark};
      text-decoration: none;
   }

   a:hover {
      text-decoration:none; 
      cursor:pointer;  
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

   // code syntax

   pre {
     border: 1px solid!important;
     border-radius: 0!important;
     background: ${theme.colors.base}!important;
     box-shadow: 6px 6px 0 0 ${theme.colors.darkGray}!important;
     padding: 8px!important;

     color: ${theme.colors.dark}!important;
     text-shadow: none!important;
     max-width: 100%!important;
     overflow-x: scroll!important;
   }
   
   code {
      color: ${theme.colors.dark}!important;
      text-shadow: none!important;
   }
   
   .token {
      &.operator, &.entity, &.url, .language-css &.string, .style &.string, &.variable, &.punctuation {
         color: #ff79c6;
      }

      &.selector, &.attr-name, &.string, &.char, &.builtin, &.inserted, &.keyword {
         color: #bd93f9;
      }

      &.atrule, &.attr-value, &.function, &.class-name {
         color: ${theme.colors.green};
      }
   }
`
