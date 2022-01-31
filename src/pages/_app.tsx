import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import GlobalStyle from '../styles/global'
import { theme } from '../styles/theme'
import Head from 'next/head'

const client = new QueryClient()

function MyApp({ Component, pageProps }) {
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
