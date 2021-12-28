import styled from 'styled-components'
import { Languages } from '../../types'

const languageColorMap: Record<Languages, string> = {
    Go: '#00ADD8',
    Javascript: '#F1E05A',
    Typescript: '#2B7489',
}

export const Wrapper = styled.div`
   width: 35ch;
   height: 20ch;
   padding: 1rem;

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
export const DescriptionWrapper = styled.div`
   max-height: 8ch;
   overflow: hidden;
   text-overflow: ellipsis;   
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
`
export const Description = styled.p`
   margin-top: 0.5rem;
   color: ${props => props.theme.colors.gray};
`
export const LanguageColor = styled.span<{ color: keyof typeof languageColorMap }>`
   width: 0.8em;
   border-radius: 50%;
   aspect-ratio: 1;
   background-color: ${props => languageColorMap[props.color]};
`