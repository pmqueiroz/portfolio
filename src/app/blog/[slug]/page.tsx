import { getAllSlugs, getPostBySlug } from '../../../service/posts'
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
  return getAllSlugs().map(slug => ({ slug }))
}
