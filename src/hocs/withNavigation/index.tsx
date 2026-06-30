import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { Footer, Navigation } from '../../components'

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
`

export interface WithMenuNavigationProps {
    isMenuOpen: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export const withNavigation = <T extends {}>(Page: NextPage<WithMenuNavigationProps>) => {
  function WrappedPage(props: PropsWithChildren<T>) {
    return (
      <Wrapper>
        <Navigation />
        <PageWrapper>
          <Page {...props} isMenuOpen={false} />
        </PageWrapper>
        <Footer />
      </Wrapper>
    )
  }

  WrappedPage.displayName = `withNavigation(${Page.displayName})`

  return WrappedPage
}
