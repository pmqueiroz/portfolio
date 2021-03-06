import fs from 'fs'
import styled from 'styled-components'
import { Article } from '../../src/components'

import { getBlogPosts } from '../../src/helpers'
import { WithMenuNavigationProps, withNavigation } from '../../src/hocs'
import { Post } from '../../src/types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
`
interface PostProps extends WithMenuNavigationProps {
   post: Post
}

function PostPage(props: PostProps) {
    const { post } = props

    return (
        <Wrapper>
            <Article post={post} />
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
