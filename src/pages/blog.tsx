import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'

import { withNavigation } from '../hocs'
import { getBlogPosts } from '../helpers'
import fs from 'fs'

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

function Blog(props) {
    const { blogPosts } = props
    const [firstPost] = blogPosts

    return (
        <Wrapper>
            <Content>
                {ReactHtmlParser(firstPost.sections.index)}
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
