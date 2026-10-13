import { getPostSummaries } from '../../service/posts'
import { JournalWindow } from './journal-window'

export default async function Page() {
  const posts = await getPostSummaries()

  return <JournalWindow posts={posts} />
}
