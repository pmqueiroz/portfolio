'use client'

import styled from 'styled-components'
import { Article } from '../../../components'

import { WithMenuNavigationProps, withNavigation } from '../../../hocs'
import { Post } from '../../../types'

const Wrapper = styled.section`
  flex-grow: 1;
  width: 100%;
  padding-top: 3rem;
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
