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
      list-style: lower-roman outside none;

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
  max-width: 80ch;
  grid-area: article;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 10rem;

  h1 {
    margin: 3rem 0;

    &:first-of-type {
       margin-top: 0;
    }
  }

  p {
   margin: 0.5rem 0;
  }

  strong {
    background: #ffff0050;
  }

  a {
     text-decoration: underline;
  }

  @media (max-width: ${theme.global.breakpoints.mobile + 'px'}) {
     pre {
        max-width: 80%;
     }
  }

  code:not(pre > code) {
      background: ${theme.colors.lightGray};
      padding: 0.3rem;
      border-radius: 3px;
} 
`
