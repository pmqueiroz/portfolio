import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
   display: grid; 
   grid-template-areas: 
            "title title title"
            "aside article article"
            "aside article article";
   gap: 4rem;
   margin: 4rem 2rem;

   @media (max-width: 920px) {
      grid-template-areas: 
            "title"
            "article"
            "article";
   }
`

export const Summary = styled.aside`
   grid-area: aside;

   ul {
      list-style: lower-roman inside none;

      a {
         li {
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s ease-in-out;
            width: content;

            &:hover {
               border-color: black;
            }
         }
      }
   }

   @media (max-width: 920px) {
      display: none;
   }
`

export const Wip = styled.aside`
`

export const Title = styled.h1`
   grid-area: title;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 1rem;
`

export const ChapterTitle = styled.h2`
`

export const TitleAnchor = styled.a`
   background: ${theme.colors.gray};
   color: ${theme.colors.base};
   padding: 3px;
   border-radius: 3px;
   opacity: 0;
   transition: opacity 0.2s ease-in-out;

   &:hover {
      opacity: 1;
   }
`

export const Divider = styled.hr`
   width: 100%;
   background: #ccc;
`

export const ChapterTitleWrapper = styled.div`
   flex: 1;
   width: 100%;
   margin-bottom: 2rem;
`

export const Content = styled.article`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
  max-width: 80ch;
  grid-area: article;
  gap: 2rem;

  h1 {
    margin: 2rem 0;

    &:first-of-type {
       margin-top: 0;
    }
  }

  strong {
    background: #ffff0050;
  }
`
