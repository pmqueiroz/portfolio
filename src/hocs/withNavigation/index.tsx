import { NextPage } from 'next'
import styled from 'styled-components'

import { Navigation } from '../../components'
import { theme } from '../../styles/theme'

const Wrapper = styled.main`
  display: flex;
  min-height: calc(100vh - ${theme.global.sizes.navigationHeight});
`
export const withNavigation = (Page: NextPage) => {
  function WrappedPage() {
      return (
         <>
            <Navigation />
            <Wrapper>
               <Page />
            </Wrapper>
         </>
      )
  }

  WrappedPage.displayName = `withNavigation(${Page.displayName})`

  return WrappedPage
}
