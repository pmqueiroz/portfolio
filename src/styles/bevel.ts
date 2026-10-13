import { css } from 'styled-components'
import { theme } from './theme'

const { card, dark, shadow, paper } = theme.colors

export const raised = css`
   border: 1px solid;
   border-color: ${card} ${dark} ${dark} ${card};
   box-shadow: inset -1px -1px 0 ${shadow}, inset 1px 1px 0 ${paper};
`

export const pressed = css`
   border-color: ${dark} ${card} ${card} ${dark};
   box-shadow: inset 1px 1px 0 ${shadow};
`

export const sunken = css`
   border: 1px solid;
   border-color: ${shadow} ${card} ${card} ${shadow};
`
