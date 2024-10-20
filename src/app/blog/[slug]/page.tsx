import { getPosts } from '../../../service/get-posts'
import { getPostBySlug } from '../../../service/get-post-by-slug'
import {PostPage} from './post-page'

export default async function({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug({ slug: params.slug })

  if (!post) {
    return null
  }

  return (
    <PostPage post={post} />
  )
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map(post => ({ slug: post.slug }))
}
