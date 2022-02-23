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

        --image-size-normal: 100px;
        --image-size-default: 200px;
      }
   }

   // code syntax

   pre[class*="language-"] {
     border: 1px solid;
     border-radius: 0;
     background: ${theme.colors.base};
     box-shadow: 6px 6px 0 0 ${theme.colors.darkGray};
     padding: 8px;

     color: ${theme.colors.dark};
     text-shadow: none;
   }
   
   code[class*="language-"] {
      color: ${theme.colors.dark};
      text-shadow: none;
   }
`
