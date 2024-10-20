'use client'

import styled from 'styled-components'

import { WithMenuNavigationProps, withNavigation } from '../../hocs'
import { getPosts } from '../../service/get-posts'
import { BlogCard, Grid } from '../../components'
import { Post } from '../../types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 5rem;
`

interface BlobProps extends WithMenuNavigationProps{
  posts: Post[]
}

export const ListPage = withNavigation<{ posts: Post[] }>(({ posts }: BlobProps) => {
  return (
    <Wrapper>
      <Grid gutter="5rem" min="40ch">
        {posts.map(post => <BlogCard key={post.slug} post={post} />)}
      </Grid>
    </Wrapper>
  )
})

export async function getStaticProps() {
  return {
    props: {
      posts: await getPosts(),
    }
  }
}
