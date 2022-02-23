import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import Prism from 'prismjs'

import GlobalStyle from '../src/styles/global'
import { theme } from '../src/styles/theme'
import Head from 'next/head'
import { useEffect } from 'react'
import { UmbraPrism } from '../external/umbra-prism'

const client = new QueryClient()

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Prism.languages.umbra = UmbraPrism
        Prism.highlightAll()
    }, [])

    return (
        <>
            <Head>
                <title>pmqueiroz</title>
            </Head>
            <QueryClientProvider client={client}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
