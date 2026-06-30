import { getPosts } from '../../service/posts'
import { ListPage } from './list-page'

export default async function() {
  const posts = await getPosts()

  return (
    <ListPage posts={posts} />
  )
}
