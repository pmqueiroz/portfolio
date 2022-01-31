import styled from 'styled-components'

import { withNavigation } from '../hocs'
import { getBlogPosts } from '../helpers'
import fs from 'fs'
import { BlogCard } from '../components'
import { Post } from '../types'

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

interface BlobProps {
  blogPosts: Post[]
}

function Blog(props: BlobProps) {
    const { blogPosts } = props
    return (
        <Wrapper>
            <Content>
                {blogPosts.map(post => <BlogCard key={post.meta.title} post={post} />)}
            </Content>
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
