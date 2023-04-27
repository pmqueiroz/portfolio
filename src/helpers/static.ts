import path from 'path'
import fs from 'fs'
import { parse } from '@pmqueiroz/ease-mark'
import { Post } from '../types'
import { slugFactory } from '.'

export async function getBlogPosts(fileSystem: typeof fs): Promise<Post[]> {
    const postsDir = path.join(process.cwd(), 'blog')
    const posts = fileSystem.readdirSync(postsDir)

    const blogPosts = await Promise.all(posts.map(async currPostDir => {
        const meta = fileSystem.readFileSync(path.join(postsDir, currPostDir, 'meta.json'), 'utf8')

        const parsedMeta = JSON.parse(meta) as Post['meta']

        const postFilesMap = await Promise.all(parsedMeta.rewrites.map(async rwFile => {

            const content = fileSystem.readFileSync(path.join(postsDir, currPostDir, rwFile.source + '.md'), 'utf8')

            return {
                name: rwFile.source,
                content: parse(content)
            }
        }))

        return {
            meta: {...parsedMeta, slug: slugFactory(parsedMeta.title)} as Post['meta'],
            sections: postFilesMap 
        }
    }))

    return blogPosts
}
