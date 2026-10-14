import { Suspense } from 'react'
import { getPostSummaries } from '../../service/posts'
import { SearchWindow } from './search-window'

export default async function Page() {
  const posts = await getPostSummaries()

  return (
    <Suspense fallback={null}>
      <SearchWindow posts={posts} />
    </Suspense>
  )
}
