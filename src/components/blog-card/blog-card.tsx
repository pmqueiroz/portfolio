import { Post } from '../../types'

import * as S from './styles'

interface BlogCardProps {
   post: Post
}

export const BlogCard = (props: BlogCardProps) => {
    const { post: { meta } } = props

    return (
        <a href={`/post/${meta.slug}`}>
            <S.Wrapper>
                {meta.title}
                <S.Description >
                    {meta.description}
                </S.Description>
            </S.Wrapper>
        </a>
    )
}
