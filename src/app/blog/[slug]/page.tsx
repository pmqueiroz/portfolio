import { getAllSlugs, getPostBySlug, getPostSummaries } from '../../../service/posts'
import { entryNumber } from '../../../helpers/entry-number'
import { PostWindow } from './post-window'

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug({ slug: params.slug })

  if (!post) {
    return null
  }

  const posts = await getPostSummaries()
  const index = posts.findIndex(p => p.slug === post.slug)

  return (
    <PostWindow
      post={post}
      number={entryNumber(posts.length, index)}
      minutes={posts[index].minutes}
      prev={posts[index + 1]?.slug}
      next={posts[index - 1]?.slug}
    />
  )
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}
