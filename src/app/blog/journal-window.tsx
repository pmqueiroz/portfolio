'use client'

import { JournalList } from '../../components/journal-list'
import { Kicker, Window } from '../../components/window'
import { PostSummary } from '../../types'

export const JournalWindow = ({ posts }: { posts: PostSummary[] }) => (
  <Window title="blog" section="blog" path="/blog">
    <Kicker style={{ marginBottom: 10 }}>BLOG · {posts.length} {posts.length === 1 ? 'POST' : 'POSTS'}</Kicker>
    <JournalList posts={posts} />
  </Window>
)
