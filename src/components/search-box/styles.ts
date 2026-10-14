import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Form = styled.form`
   display: flex;
   gap: 4px;
   align-items: center;
   min-width: 0;

   button {
      min-width: 0;
      padding-left: 10px;
      padding-right: 10px;
   }
`

export const Field = styled.input`
   flex: 1;
   min-width: 0;
   height: 23px;
   padding: 2px 4px;
   font-family: inherit;
   font-size: 12px;
   color: ${theme.colors.dark};
   background: ${theme.colors.card};
   border: 1px solid;
   border-color: ${theme.colors.shadow} ${theme.colors.card} ${theme.colors.card} ${theme.colors.shadow};
   box-shadow: inset 1px 1px 0 ${theme.colors.dark}, inset -1px -1px 0 ${theme.colors.lightGray};

   &:focus {
      outline: none;
   }
`
