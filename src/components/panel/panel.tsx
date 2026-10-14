import { ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Box = styled.section`
   border: 1px solid ${theme.colors.dark};
`

export const TitleBar = styled.div`
   background: ${theme.gradients.panel};
   color: ${theme.colors.card};
   font-size: 10px;
   letter-spacing: 2px;
   padding: 4px 8px;
   display: flex;
   justify-content: space-between;
   text-transform: uppercase;

   a,
   a:visited {
      color: ${theme.colors.card};
      text-transform: none;
   }
`

interface PanelProps {
   title: string
   action?: ReactNode
   className?: string
   children: ReactNode
}

export const Panel = ({ title, action, className, children }: PanelProps) => (
  <Box className={className}>
    <TitleBar>
      <span>{title}</span>
      {action}
    </TitleBar>
    {children}
  </Box>
)
