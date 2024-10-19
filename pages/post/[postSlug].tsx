import styled from 'styled-components'
import { Article } from '../../src/components'

import { WithMenuNavigationProps, withNavigation } from '../../src/hocs'
import { Post } from '../../src/types'
import { getPosts } from '../../src/service/get-posts'
import { getPostBySlug } from '../../src/service/get-post-by-slug'

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
  const post = await getPostBySlug({ slug: params.postSlug })

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  const paths = posts.map(post => '/post/' + post.slug)

  return {
    paths: paths,
    fallback: false,
  }
}

export default withNavigation(PostPage)
