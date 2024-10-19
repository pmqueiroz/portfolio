import styled from 'styled-components'

import { WithMenuNavigationProps, withNavigation } from '../src/hocs'
import { getPosts } from '../src/service/get-posts'
import { BlogCard, Grid } from '../src/components'
import { Post } from '../src/types'

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

function Blog({ posts }: BlobProps) {
    return (
        <Wrapper>
            <Grid gutter="5rem" min="40ch">
                {posts.map(post => <BlogCard key={post.slug} post={post} />)}
            </Grid>
        </Wrapper>
    )
}

export async function getStaticProps() {
    return {
        props: {
            posts: await getPosts(),
        }
    }
}

export default withNavigation(Blog)
