import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { FaExclamationTriangle } from 'react-icons/fa'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { Post } from '../../types'

import * as S from './styles'
import { Alert, Divider, Flex } from '..'

interface BlogCardProps {
   post: Post
}

const ChapterTitle = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <>
    <S.ChapterTitleWrapper id={id}>
      <Flex align='center' justify='start' gap='0.5rem'>
        <S.ChapterTitle>{children}</S.ChapterTitle>
        <S.TitleAnchor href={`#${id}`}>#</S.TitleAnchor>
      </Flex>
      <Divider />
    </S.ChapterTitleWrapper>
  </>
)

export const Article = ({ post }: BlogCardProps) => {
  return (
    <S.Wrapper>
      <S.Title>
        <h1>{post.title}</h1>
        {post.draft && <Alert><FaExclamationTriangle /> This article is marked as draft</Alert>}
      </S.Title>
      <S.Summary>
        <ul>
          {post.chapters.map(({ name }) => <AnchorLink key={name} href={`#${name}`}><li>{name}</li></AnchorLink>)}
        </ul>
      </S.Summary>
      <S.Content>
        {post.chapters.map(({ content, name }) => (
          <React.Fragment key={name}>
            <ChapterTitle id={name}>{name}</ChapterTitle>
            {ReactHtmlParser(content)}
          </React.Fragment>
        ))}
      </S.Content>
    </S.Wrapper>
  )
}
