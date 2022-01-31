import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import fs from 'fs'
import { Post } from '../types'
import { slugFactory } from '.'

import 'prismjs/themes/prism-okaidia.css'

export async function getBlogPosts(fileSystem: typeof fs): Promise<Post[]> {
    const postsDir = path.join(process.cwd(), 'blog')
    const posts = fileSystem.readdirSync(postsDir)

    const blogPosts = await Promise.all(posts.map(async currPostDir => {
        const meta = fileSystem.readFileSync(path.join(postsDir, currPostDir, 'meta.json'), 'utf8')

        const parsedMeta = JSON.parse(meta) as Post['meta']

        const postFilesMap = await Promise.all(parsedMeta.rewrites.map(async rwFile => {

            const content = fileSystem.readFileSync(path.join(postsDir, currPostDir, rwFile.source + '.md'), 'utf8')

            const parsedContent = await unified()
                .use(remarkParse)
                .use(remarkHtml, { sanitize: false })
                .process(content)

            return {
                name: rwFile.source,
                content: parsedContent.value as string
            }
        }))

        return {
            meta: {...parsedMeta, slug: slugFactory(parsedMeta.title)} as Post['meta'],
            sections: postFilesMap 
        }
    }))

    return blogPosts
}
