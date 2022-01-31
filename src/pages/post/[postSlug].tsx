import fs from 'fs'
import styled from 'styled-components'
import { Article } from '../../components'

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
interface PostProps {
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
