import styled from 'styled-components'

export const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 2rem;
   max-width: 890px;
   padding: 2rem;
   border-radius: 10px;
   border: 1px solid ${props => props.theme.colors.dark};
   background: ${props => props.theme.colors.base};

   code {
      overflow-x: scroll;
   }
`

export const Header = styled.header`
   display: flex;
   gap: 5rem;
   justify-content: space-between;
   align-items: start;
   width: 100%;
`

export const Link = styled.a`
   color: ${props => props.theme.colors.darkGray};
   border-bottom: 1px solid transparent;
   transition: border .1s ease-in-out;

   &:hover {
      border-bottom: 1px solid ${props => props.theme.colors.dark};
   }
`

export const RepoTitle = styled.h1``

export const RepoDescription = styled.p`
   color: ${props => props.theme.colors.gray};
`

export const CloseButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   padding: .5rem;
   cursor: pointer;
   border-radius: 10px;
   border: 1px solid transparent;
   transition: border .1s ease-in-out;

   &:hover {
      border: 1px solid ${props => props.theme.colors.dark};
   }
`
