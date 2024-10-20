'use client'

import styled from 'styled-components'
import { Article } from '../../../components'

import { WithMenuNavigationProps, withNavigation } from '../../../hocs'
import { Post } from '../../../types'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
`
interface PostProps extends WithMenuNavigationProps {
   post: Post
}

export const PostPage = withNavigation<{ post: Post }>(({ post }: PostProps) => {
  return (
    <Wrapper>
      <Article post={post} />
    </Wrapper>
  )
})
