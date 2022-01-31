import path from 'path'
import fs from 'fs'
import styled from 'styled-components'

import { withNavigation } from '../hocs'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

function Blog(props) {
    console.log(props)

    return (
        <Wrapper>
      Soon
        </Wrapper>
    )
}

export async function getStaticProps() {
    const postsDir = path.join(process.cwd(), 'blog')
    const posts = fs.readdirSync(postsDir)

    const blogPosts = posts.map(currPostDir => {
        const currPostFiles = fs.readdirSync(path.join(postsDir, currPostDir))
        const meta = fs.readFileSync(path.join(postsDir, currPostDir, 'meta.json'), 'utf8')

        const postFiles = currPostFiles.reduce((acc, curr) => {
            if(curr.endsWith('.md')) {
                const content = fs.readFileSync(path.join(postsDir, currPostDir, curr), 'utf8')
                const name = curr.replace('.md', '')

                return {
                    ...acc,
                    [name]: content
                }
            } 

            return acc
        }, {})

        return {
            meta: JSON.parse(meta),
            chapters: postFiles
        }
    })

    return {
        props: { blogPosts },
    }
}

export default withNavigation(Blog)
