'use client'

import { JournalList } from '../../components/journal-list'
import { Kicker, Window } from '../../components/window'
import { PostSummary } from '../../types'

export const JournalWindow = ({ posts }: { posts: PostSummary[] }) => (
  <Window title="journal" section="journal" path="/blog">
    <Kicker style={{ marginBottom: 10 }}>JOURNAL · {posts.length} {posts.length === 1 ? 'ENTRY' : 'ENTRIES'}</Kicker>
    <JournalList posts={posts} />
  </Window>
)
