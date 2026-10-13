'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { StyledComponentsRegistry } from '../lib/styled-registry'

const queryClient = new QueryClient()

export const Providers = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  )
}
