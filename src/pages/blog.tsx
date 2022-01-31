import path from 'path'
import fs from 'fs'
import styled from 'styled-components'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import ReactHtmlParser from 'react-html-parser'

import { withNavigation } from '../hocs'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

function Blog(props) {
    const { blogPosts } = props
    const [firstPost] = blogPosts

    return (
        <Wrapper>
            {ReactHtmlParser(firstPost.sections.index)}
        </Wrapper>
    )
}

export async function getStaticProps() {
    const postsDir = path.join(process.cwd(), 'blog')
    const posts = fs.readdirSync(postsDir)

    const blogPosts = await Promise.all(posts.map(async currPostDir => {
        const currPostFiles = fs.readdirSync(path.join(postsDir, currPostDir))
        const meta = fs.readFileSync(path.join(postsDir, currPostDir, 'meta.json'), 'utf8')

        const promisedPostFiles = currPostFiles.reduce(async (promisedAcc, curr) => {
            const acc = await promisedAcc

            if(curr.endsWith('.md')) {
                const content = fs.readFileSync(path.join(postsDir, currPostDir, curr), 'utf8')
                const name = curr.replace('.md', '')

                const parsedContent = await unified()
                    .use(remarkParse)
                    .use(remarkHtml)
                    .process(content)

                return {
                    ...acc,
                    [name]: parsedContent.value
                }
            } 

            return acc
        }, Promise.resolve([]))

        const postsContent = await promisedPostFiles

        return {
            meta: JSON.parse(meta),
            sections: postsContent
        }
    }))

    return {
        props: { blogPosts },
    }
}

export default withNavigation(Blog)
