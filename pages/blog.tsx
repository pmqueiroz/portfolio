import styled from 'styled-components'

import { withNavigation } from '../src/hocs'
import { getBlogPosts } from '../src/helpers'
import fs from 'fs'
import { BlogCard, Grid } from '../src/components'
import { Post } from '../src/types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 5rem;
`

interface BlobProps {
  blogPosts: Post[]
}

function Blog(props: BlobProps) {
    const { blogPosts } = props
    return (
        <Wrapper>
            <Grid gutter="5rem" min="40ch">
                {blogPosts.map(post => <BlogCard key={post.meta.title} post={post} />)}
            </Grid>
        </Wrapper>
    )
}

export async function getStaticProps() {
    return {
        props: {
            blogPosts: await getBlogPosts(fs)
        }
    }
}

export default withNavigation(Blog)
