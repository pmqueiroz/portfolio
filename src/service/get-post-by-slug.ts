import { Post, RawPost } from '../types'
import { cmsApi } from './api'
import { AxiosResponse } from 'axios'
import { parseMarkdown } from '../helpers/parse-markdown'

export async function getPostBySlug({ slug }:{ slug: string }): Promise<Post | undefined> {
    const { data: { data: [post] } } = await cmsApi({
        url: '/blogs',
        params: {
            populate: '*',
            'filters[slug][$eq]': slug
        }
    }) as AxiosResponse<{ data: RawPost[] }>

    if (!post) {
        return 
    }
    
    const parsedChapters = await Promise.all(post.attributes.chapters.map(async ({ content, ...rest }) => {
        return {
            content: await parseMarkdown(content),
            ...rest,
        }
    }))

    return {
        ...post.attributes,
        chapters: parsedChapters 
    }
}
