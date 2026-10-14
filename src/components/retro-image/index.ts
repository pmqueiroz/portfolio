import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const RetroImage = styled.img<{ $fit?: 'cover' | 'contain' }>`
   display: block;
   flex-shrink: 0;
   object-fit: ${({ $fit = 'cover' }) => $fit};
   background: ${theme.colors.paper};
   border: 2px outset ${theme.colors.outset};
`
