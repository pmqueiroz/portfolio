import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa'

import * as S from './styles'

const _references = {
   github: 'https://github.com/pmqueiroz',
   linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
   dev: 'https://dev.to/pmqueiroz',
}

export const Navigation = () => {
   return (
      <S.Wrapper>
         <S.LinkGroup space="2rem">
            <S.Link href="/projects">projects</S.Link>
            <S.Link href="/blog">blog</S.Link>
            <S.ExternalLink ></S.ExternalLink>
         </S.LinkGroup>
         <S.Logo>pmqueiroz</S.Logo>
         <S.LinkGroup space="2rem">
            <S.ExternalLink href={_references['github']} target="_blank" >
               <FaGithub size={28}/>
            </S.ExternalLink>
            <S.ExternalLink href={_references['linkedin']} target="_blank" >
               <FaLinkedin size={28}/>
            </S.ExternalLink>
            <S.ExternalLink href={_references['dev']} target="_blank" >
               <FaDev size={28}/>
            </S.ExternalLink>
         </S.LinkGroup>
      </S.Wrapper>
   )
}