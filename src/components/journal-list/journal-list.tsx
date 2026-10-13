import Link from 'next/link'
import styled from 'styled-components'

import { PostSummary } from '../../types'
import { theme } from '../../styles/theme'
import { entryNumber } from '../../helpers/entry-number'
import { DraftBadge, NewBadge } from '../badge'
import { Emojify } from '../emoji'

type Variant = 'compact' | 'full'

const Row = styled.div<{ $variant: Variant }>`
   display: grid;
   grid-template-columns: ${({ $variant }) => ($variant === 'full' ? 40 : 36)}px 1fr auto;
   gap: ${({ $variant }) => ($variant === 'full' ? 12 : 10)}px;
   padding: ${({ $variant }) => ($variant === 'full' ? '12px 4px' : '8px 10px')};
   border-top: 1px solid ${theme.colors.line};
   font-size: 13px;
   align-items: baseline;
`

const Num = styled.span`
   color: ${theme.colors.muted};
`

const Body = styled.div`
   display: flex;
   flex-direction: column;
   gap: 3px;
`

const Title = styled.span<{ $variant: Variant }>`
   font-size: ${({ $variant }) => ($variant === 'full' ? 14 : 13)}px;

   ${NewBadge}, ${DraftBadge} {
      margin-left: 6px;
   }
`

const Desc = styled.span`
   font-family: ${theme.fonts.type};
   font-size: 13px;
   color: ${theme.colors.subtext};
`

const Min = styled.span`
   font-size: 11px;
   color: ${theme.colors.muted};
   white-space: nowrap;
`

interface JournalListProps {
   posts: PostSummary[]
   variant?: Variant
   limit?: number
}

export const JournalList = ({ posts, variant = 'full', limit }: JournalListProps) => (
  <div>
    {posts.slice(0, limit).map((post, i) => (
      <Row key={post.slug} $variant={variant}>
        <Num>{entryNumber(posts.length, i)}</Num>
        <Body>
          <Title $variant={variant}>
            <Link href={`/blog/${post.slug}`}><Emojify text={post.title} /></Link>
            {i === 0 && <NewBadge />}
            {variant === 'full' && post.draft && <DraftBadge />}
          </Title>
          {variant === 'full' && post.description && <Desc><Emojify text={post.description} /></Desc>}
        </Body>
        <Min>{post.minutes} min</Min>
      </Row>
    ))}
  </div>
)
