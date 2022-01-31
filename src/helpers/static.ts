import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import fs from 'fs'
import { Post } from '../types'
import { slugFactory } from '.'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export async function getBlogPosts(fileSystem: typeof fs): Promise<Post[]> {
    const postsDir = path.join(process.cwd(), 'blog')
    const posts = fileSystem.readdirSync(postsDir)

    const blogPosts = await Promise.all(posts.map(async currPostDir => {
        const currPostFiles = fileSystem.readdirSync(path.join(postsDir, currPostDir))
        const meta = fileSystem.readFileSync(path.join(postsDir, currPostDir, 'meta.json'), 'utf8')

        const promisedPostFiles = currPostFiles.reduce(async (promisedAcc, curr) => {
            const acc = await promisedAcc

            if(curr.endsWith('.md')) {
                const content = fileSystem.readFileSync(path.join(postsDir, currPostDir, curr), 'utf8')
                const name = curr.replace('.md', '')

                const parsedContent = await unified()
                    .use(remarkParse)
                    .use(remarkHtml, { sanitize: false })
                    .process(content)

                return {
                    ...acc,
                    [name]: parsedContent.value
                }
            } 

            return acc
        }, Promise.resolve([]))

        const postsContent = await promisedPostFiles as unknown as Post['sections']

        const parsedMeta = JSON.parse(meta)


        return {
            meta: {...parsedMeta, slug: slugFactory(parsedMeta.title)} as Post['meta'],
            sections: postsContent 
        }
    }))

    return blogPosts
}
