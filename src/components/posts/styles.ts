import styled from 'styled-components'

export const Wrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr 4fr;
   gap: 4rem;
   margin: 4rem 0;
`

export const Summary = styled.aside`
   
`

export const ChapterTitle = styled.h2`
   display: block;
   flex: 1;
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
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
  max-width: 80ch;

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
