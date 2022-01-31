import styled from 'styled-components'
export const Wrapper = styled.div`
   width: 35ch;
   height: 20ch;
   padding: 2rem 1rem;

   border-radius: 10px;
   border: 1px solid ${props => props.theme.colors.gray};

   display: flex;
   flex-direction: column;
   justify-content: space-between;
   transition: border-color 0.2s ease-in-out;   

   &:hover {
      border-color: ${props => props.theme.colors.dark};
   }

   svg {
      fill: ${props => props.theme.colors.gray};
   }
`
export const Description = styled.p`
   margin-top: 0.5rem;
   color: ${props => props.theme.colors.gray};
   max-height: 8ch;
   overflow: hidden;
   text-overflow: ellipsis;   
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
`
