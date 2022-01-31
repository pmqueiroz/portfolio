import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { FaCommentDots } from 'react-icons/fa'
import { theme } from '../../styles/theme'

import { Post } from '../../types'

import * as S from './styles'

interface BlogCardProps {
   post: Post
}

const ChapterTitle = ({ children }: { children: React.ReactNode }) => (
    <>
        <S.ChapterTitleWrapper>
            <S.ChapterTitle>{children}</S.ChapterTitle>
            <S.Divider />
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
            <S.Title> {meta.draft && <FaCommentDots title='Work in progress' color={theme.colors.orange}/>} {meta.title}</S.Title>
            <S.Summary>
                <ul>
                    {sections.map(({ name }) => <li key={name}>{getRewriteName(name, meta.rewrites)}</li>)}
                </ul>
            </S.Summary>
            <S.Content>
                {sections.map(({ content, name }) => (
                    <React.Fragment key={name}>
                        <ChapterTitle>{getRewriteName(name, meta.rewrites)}</ChapterTitle>
                        {ReactHtmlParser(content)}
                    </React.Fragment>
                ))}
            </S.Content>
        </S.Wrapper>
    )
}