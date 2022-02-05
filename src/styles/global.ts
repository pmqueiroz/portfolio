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

   @media (max-width: 920px) {
      :root{
        font-size: 62.5%
      }
   }
`
