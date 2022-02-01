import { NextPage } from 'next'
import styled from 'styled-components'

import { Navigation } from '../../components'
import { theme } from '../../styles/theme'

const PageWrapper = styled.main`
  display: flex;
  min-height: calc(100vh - ${theme.global.sizes.navigationHeight});
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withNavigation = (Page: NextPage<any>) => {
    function WrappedPage(props: unknown) {
        return (
            <Wrapper>
                <Navigation />
                <PageWrapper>
                    <Page {...props} />
                </PageWrapper>
            </Wrapper>
        )
    }

    WrappedPage.displayName = `withNavigation(${Page.displayName})`

    return WrappedPage
}
