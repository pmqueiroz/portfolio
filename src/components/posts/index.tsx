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

export const Article = (props: BlogCardProps) => {
    const { post } = props

    const { meta, sections } = post

    function getRewriteName(name: string, rewrites: Post['meta']['rewrites']) {
        const rewrite = rewrites.find(rewrite => rewrite.source === name)

        return rewrite ? rewrite.name : name
    }

    return (
        <S.Wrapper>
            <S.Title>
                <h1>{meta.title}</h1>
                {meta.draft && <Alert><FaExclamationTriangle /> This article is marked as draft</Alert>}
            </S.Title>
            <S.Summary>
                <ul>
                    {sections.map(({ name }) => <AnchorLink key={name} href={`#${name}`}><li>{getRewriteName(name, meta.rewrites)}</li></AnchorLink>)}
                </ul>
            </S.Summary>
            <S.Content>
                {sections.map(({ content, name }) => (
                    <React.Fragment key={name}>
                        <ChapterTitle id={name}>{getRewriteName(name, meta.rewrites)}</ChapterTitle>
                        {ReactHtmlParser(content)}
                    </React.Fragment>
                ))}
            </S.Content>
        </S.Wrapper>
    )
}
