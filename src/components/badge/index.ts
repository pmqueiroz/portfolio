import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Badge = styled.span`
   font-size: 9px;
   font-weight: 700;
   letter-spacing: 1px;
   white-space: nowrap;
`

export const NewBadge = styled(Badge).attrs({ children: 'NEW!' })`
   background: ${theme.colors.red};
   color: ${theme.colors.card};
   padding: 1px 4px;
`

export const DraftBadge = styled(Badge).attrs({ children: 'DRAFT' })`
   border: 1px dashed ${theme.colors.orange};
   color: ${theme.colors.orange};
   padding: 0 4px;
`
