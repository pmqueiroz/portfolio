import styled from 'styled-components'

export const Wrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: stretch;
   flex-direction: column;
   gap: 2rem;
   width: 100%;
   max-width: 890px;
   border: 1.5px solid ${props => props.theme.colors.dark};
   background: ${props => props.theme.colors.card};
   box-shadow: 6px 6px 0 0 ${props => props.theme.colors.shadow};
   padding: 2rem;

   @media (max-width: ${props => props.theme.global.breakpoints.mobile}px) {
      max-width: 100%;
   }

   code {
      overflow-x: auto;
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
   font-size: 0.72rem;
   letter-spacing: 1px;
   text-transform: uppercase;
   color: ${props => props.theme.colors.muted};
   border-bottom: 1px solid transparent;
   transition: border .1s ease-in-out;

   &:hover {
      border-bottom: 1px solid ${props => props.theme.colors.dark};
   }
`

export const RepoDescription = styled.p`
   font-family: 'Cutive Mono', monospace;
   color: ${props => props.theme.colors.subtext};
   max-width: 50ch;
`

export const CloseButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   padding: .5rem;
   cursor: pointer;
   border: 1.5px solid transparent;
   transition: border .1s ease-in-out;

   &:hover {
      border: 1.5px solid ${props => props.theme.colors.dark};
   }
`
