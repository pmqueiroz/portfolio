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
   post: Post
}

function PostPage(props: PostProps) {
    const { post } = props

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

export async function getStaticProps({ params }) {
    const posts = await getBlogPosts(fs)

    const post = posts.find(post => post.meta.slug === params.postSlug)

    return {
        props: {
            post
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
