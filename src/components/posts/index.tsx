import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { Post } from '../../types'

import * as S from './styles'

interface BlogCardProps {
   post: Post
}

const readTime = (post: Post) => {
  const words = post.chapters.map(c => c.content).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const pad = (n: number) => String(n).padStart(2, '0')

export const Article = ({ post }: BlogCardProps) => {
  return (
    <S.Wrapper>
      <S.Back href="/blog">← back to journal</S.Back>

      <S.Header>
        <S.Kicker>
          Entry · {readTime(post)} min read{post.draft && ' · draft'}
        </S.Kicker>
        <h1>{post.title}</h1>
        <S.Lede>{post.description}</S.Lede>
      </S.Header>

      <S.Layout>
        <S.Summary>
          <div className="sticky">
            <div className="label">Contents</div>
            <ol>
              {post.chapters.map(({ name }, i) => (
                <AnchorLink key={name} href={`#${name}`}>
                  <li><span className="num">{pad(i + 1)}</span>{name}</li>
                </AnchorLink>
              ))}
            </ol>
          </div>
        </S.Summary>

        <S.Content>
          {post.chapters.map(({ content, name }, i) => (
            <React.Fragment key={name}>
              <S.ChapterTitleWrapper id={name}>
                <h2><span className="num">{pad(i + 1)}</span>{name}</h2>
                <div className="rule" />
              </S.ChapterTitleWrapper>
              {ReactHtmlParser(content)}
            </React.Fragment>
          ))}
        </S.Content>
      </S.Layout>
    </S.Wrapper>
  )
}
