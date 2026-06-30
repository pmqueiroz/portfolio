'use client'

import Link from 'next/link'
import styled from 'styled-components'

import { WithMenuNavigationProps, withNavigation } from '../../hocs'
import { Post } from '../../types'
import { theme } from '../../styles/theme'

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: 920px;
  margin: 0 auto;
  padding: 3.5rem 2rem 6rem;
  width: 100%;
`

const Header = styled.header`
  text-align: center;
  border-bottom: 3px double ${theme.colors.dark};
  padding-bottom: 1.6rem;
  margin-bottom: 2.6rem;
`

const Kicker = styled.div`
  font-size: 0.68rem;
  letter-spacing: 5px;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  margin-bottom: 0.7rem;
`

const Title = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: lowercase;
  letter-spacing: -1px;
  line-height: 1;
`

const Entry = styled(Link)`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.6rem;
  align-items: start;
  padding: 1.7rem 0;
  border-bottom: 1px solid ${theme.colors.line};
  cursor: pointer;
  color: ${theme.colors.dark};

  &:hover {
    background: #00000005;
  }

  @media (max-width: ${theme.global.breakpoints.mobile}px) {
    grid-template-columns: 70px 1fr;
  }
`

const Index = styled.div`
  text-align: right;
  border-right: 2px solid ${theme.colors.dark};
  padding-right: 1.2rem;

  .num {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .label {
    font-size: 0.62rem;
    letter-spacing: 3px;
    color: ${theme.colors.muted};
    text-transform: uppercase;
    margin-top: 3px;
  }
`

const Body = styled.div`
  .head {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    font-family: 'Cutive Mono', monospace;
    font-size: 0.92rem;
    line-height: 1.6;
    color: ${theme.colors.subtext};
    margin-top: 0.5rem;
    max-width: 54ch;
  }
`

const Draft = styled.span`
  font-size: 0.58rem;
  letter-spacing: 1.5px;
  border: 1.5px solid ${theme.colors.dark};
  color: ${theme.colors.dark};
  padding: 1px 5px;
  transform: rotate(-4deg);
  text-transform: uppercase;
  opacity: 0.75;
`

const Read = styled.div`
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  white-space: nowrap;
  padding-top: 4px;

  @media (max-width: ${theme.global.breakpoints.mobile}px) {
    grid-column: 2;
  }
`

interface BlobProps extends WithMenuNavigationProps {
  posts: Post[]
}

const readTime = (post: Post) => {
  const words = post.chapters
    .map(c => c.content)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export const ListPage = withNavigation<{ posts: Post[] }>(({ posts }: BlobProps) => {
  return (
    <Wrapper>
      <Header>
        <Kicker>Bound volume · {posts.length} entries</Kicker>
        <Title>the journal</Title>
      </Header>
      <div>
        {posts.map((post, i) => (
          <Entry key={post.slug} href={`/blog/${post.slug}`}>
            <Index>
              <div className="num">{String(posts.length - i).padStart(2, '0')}</div>
              <div className="label">Entry</div>
            </Index>
            <Body>
              <div className="head">
                <h2>{post.title}</h2>
                {post.draft && <Draft>draft</Draft>}
              </div>
              <p>{post.description}</p>
            </Body>
            <Read>{readTime(post)} min</Read>
          </Entry>
        ))}
      </div>
    </Wrapper>
  )
})
