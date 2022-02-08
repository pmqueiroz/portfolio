import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr 80ch;
   grid-template-areas: 
            "title title"
            "aside article"
            "aside article";
   gap: 4rem;
   margin: 4rem 2rem;

   @media (max-width: 1000px) {
      grid-template-columns: 1fr;
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

   @media (max-width: 1000px) {
      display: none;
   }
`

export const Title = styled.header`
   grid-area: title;
   display: flex;
   width: 100%;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   width: 100%;
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
  grid-area: article;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 10rem;
  text-align: justify;
  text-justify: inter-word;
  line-height: 1.8;

  h1 {
    margin: 3rem 0;

    &:first-of-type {
       margin-top: 0;
    }
  }

  p {
   margin: 0.5rem 0;
   text-indent: 2rem;
  }

  s {
      color: ${theme.colors.gray};
  }

  strong {
    background: #ffff0050;
  }

  a {
     text-decoration: underline;
  }

  pre {
     overflow-x: auto;
     max-width: 90vw;
  }

  code:not(pre > code) {
      background: ${theme.colors.lightGray};
      padding: 0.3rem;
      border-radius: 3px;
} 
`
