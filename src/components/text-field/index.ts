import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

const sunkenField = css`
   min-width: 0;
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

   &:disabled {
      background: ${theme.colors.bevel};
      color: ${theme.colors.muted};
   }
`

export const TextField = styled.input`
   ${sunkenField}
   height: 23px;
`

export const TextArea = styled.textarea`
   ${sunkenField}
   resize: vertical;
   line-height: 1.4;
`
