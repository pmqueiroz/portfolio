'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import reactHtmlParser from 'react-html-parser'

import { DraftBadge } from '../../../components/badge'
import { Prose } from '../../../components/prose'
import { Kicker, Window } from '../../../components/window'
import { theme } from '../../../styles/theme'
import { Post } from '../../../types'

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.h1`
  font-size: 28px;
  line-height: 1.15;
`

const Lede = styled.p`
  font-family: ${theme.fonts.type};
  font-size: 16px;
  color: ${theme.colors.subtext};
`

const Ring = styled.nav`
  font-size: 12px;
  text-align: center;
  border: 1px solid ${theme.colors.line};
  padding: 6px;
  color: ${theme.colors.muted};

  a, span {
    margin: 0 4px;
  }
`

interface PostWindowProps {
  post: Post
  number: string
  minutes: number
  prev?: string
  next?: string
}

export const PostWindow = ({ post, number, minutes, prev, next }: PostWindowProps) => (
  <Window title="journal » entry" section="journal" path={`/blog/${post.slug}`}>
    <Article>
      <Kicker>
        ENTRY {number} · {minutes} min {post.draft && <DraftBadge />}
      </Kicker>
      <Title>{post.title}</Title>
      {post.description && <Lede>{post.description}</Lede>}
      <Prose>
        {post.chapters.map(({ name, content }) => (
          <Fragment key={name}>
            <h2 id={name}>{name}</h2>
            {reactHtmlParser(content)}
          </Fragment>
        ))}
      </Prose>
      <Ring aria-label="Journal entries">
        [
        {prev ? <Link href={`/blog/${prev}`}>« prev entry</Link> : <span>« prev entry</span>}
        |
        <Link href="/blog">all entries</Link>
        |
        {next ? <Link href={`/blog/${next}`}>next entry »</Link> : <span>next entry »</span>}
        ]
      </Ring>
    </Article>
  </Window>
)
