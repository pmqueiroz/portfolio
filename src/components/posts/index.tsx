import ReactHtmlParser from 'react-html-parser'

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

    const sections = Object.entries(post.sections)

    function getRewriteName(name: string, rewrites: Post['meta']['rewrites']) {
        const rewrite = rewrites.find(rewrite => rewrite.source === name)

        return rewrite ? rewrite.name : name
    }

    return (
        <S.Wrapper>
            <S.Summary>
                <ul>
                    {sections.map(([name]) => <li key={name}>{getRewriteName(name, post.meta.rewrites)}</li>)}
                </ul>
            </S.Summary>
            <S.Content>
                {sections.map(([name, content]) => (
                    <>
                        <ChapterTitle>{getRewriteName(name, post.meta.rewrites)}</ChapterTitle>
                        {ReactHtmlParser(content)}
                    </>
                ))}
            </S.Content>
        </S.Wrapper>
    )
}