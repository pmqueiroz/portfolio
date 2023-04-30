import styled from 'styled-components'

export const Dimmer = styled.div<{ visible: boolean }>`
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   height: 100vh;
   width: 100vw;
   background: #000;
   opacity: .3;
   z-index: 100;
`

export const Wrapper = styled.div`
   z-index: 200;
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   max-width: 830px;
   padding: 2rem;
   border-radius: 10px;
   border: 1px solid ${props => props.theme.colors.dark};
   background: ${props => props.theme.colors.base};
`

export const Header = styled.header`
   display: flex;
   gap: 5rem;
   justify-content: space-between;
   align-items: start;
`

export const Link = styled.a`
   color: ${props => props.theme.colors.darkGray};
`

export const RepoTitle = styled.h1``

export const RepoDescription = styled.p`
   color: ${props => props.theme.colors.gray}
`
