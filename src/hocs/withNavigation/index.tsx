import { NextPage } from 'next'
import { PropsWithChildren, useState } from 'react'
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

export interface WithMenuNavigationProps {
    isMenuOpen: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withNavigation = (Page: NextPage<WithMenuNavigationProps>) => {
    function WrappedPage(props: PropsWithChildren<unknown>) {
        const [isMenuOpen, toggleMenuOpen] = useState(false)

        return (
            <Wrapper>
                <Navigation isOpen={isMenuOpen} toggleOpen={toggleMenuOpen} />
                <PageWrapper>
                    <Page {...props} isMenuOpen={isMenuOpen}/>
                </PageWrapper>
            </Wrapper>
        )
    }

    WrappedPage.displayName = `withNavigation(${Page.displayName})`

    return WrappedPage
}
