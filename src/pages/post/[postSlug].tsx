import fs from 'fs'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'

import { getBlogPosts } from '../../helpers'
import { withNavigation } from '../../hocs'
import { Post } from '../../types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
`

const Content = styled.article`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100ch;

  h1 {
    margin: 2rem 0;
  }

  strong {
    background: #ffff0050;
  }
`

interface PostProps {
   posts: Post[]
}

function PostPage(props: PostProps) {
    const { posts } = props
    const { query } = useRouter()

    const { postSlug } = query

    const post = posts.find(post => post.meta.slug === postSlug)

    return (
        <Wrapper>
            <Content>
                {Object.entries(post.sections).map(([name, content]) => (
                    ReactHtmlParser(content)
                ))}
            </Content>
        </Wrapper>
    )
}

export async function getStaticProps() {
    return {
        props: {
            posts: await getBlogPosts(fs)
        }
    }
}

export async function getStaticPaths() {
    const posts = await getBlogPosts(fs)

    const paths = posts.map(post => '/post/' + post.meta.slug)

    return {
        paths: paths,
        fallback: false,
    }
}

export default withNavigation(PostPage)
