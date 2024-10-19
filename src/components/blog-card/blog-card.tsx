import { Post } from '../../types'

import * as S from './styles'

interface BlogCardProps {
   post: Post
}

export const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <a href={`/post/${post.slug}`}>
            <S.Wrapper>
                {post.title}
                <S.Description >
                    {post.description}
                </S.Description>
            </S.Wrapper>
        </a>
    )
}
