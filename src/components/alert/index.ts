import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${theme.colors.orangeLight};
  border: 1px solid ${theme.colors.orange};
  border-radius: 5px;
  padding: 0.3rem 0.5rem;

  svg {
    fill: ${theme.colors.orange};
  }
`
