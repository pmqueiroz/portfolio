import { createGlobalStyle } from 'styled-components'
import { theme } from '../styles/theme'

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'JetBrains Mono', monospace;
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

   @media (max-width: 920px) {
      :root{
        font-size: 62.5%
      }
   }
`;