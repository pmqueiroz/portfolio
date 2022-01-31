import { FaBook, FaStar } from 'react-icons/fa'
import { Flex } from '..'

import { Post } from '../../types'

import * as S from './styles'

interface BlogCardProps {
   post: Post
}

export const BlogCard = (props: BlogCardProps) => {
    const { post } = props

    return (
        <a href={`/post/${post.meta.title}`}>
            <S.Wrapper>
                <Flex gap="0.5rem" align="center">
                    <FaBook />
                    {post.meta.title}
                </Flex>
                <S.DescriptionWrapper>
                    <S.Description >
                        {post.meta.description}
                    </S.Description>
                </S.DescriptionWrapper>
            </S.Wrapper>
        </a>
    )
}
