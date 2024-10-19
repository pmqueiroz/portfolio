import { Post, RawPost } from '../types'
import { cmsApi } from './api'
import { AxiosResponse } from 'axios'

export async function getPosts(): Promise<Post[]> {
  const { data: { data: posts } } = await cmsApi({
    url: '/blogs',
  }) as AxiosResponse<{ data: RawPost[] }>

  return posts.map(({ attributes }) => attributes)
}
