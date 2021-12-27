import { forwardRef, ForwardedRef } from 'react'
import { FaGithub, FaLinkedin, FaDev, FaMailBulk } from 'react-icons/fa'
import { ScaleUp } from '..'

import * as S from './styles'

const _references = {
    github: 'https://github.com/pmqueiroz',
    linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
    dev: 'https://dev.to/pmqueiroz',
    mail: 'mailto:contato@pmqueiroz.com'
}

const Navigation = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => (
    <S.Wrapper ref={ref}>
        <S.LinkGroup space="2rem">
            <ScaleUp intensity="low">
                <S.Link href="/projects">projects</S.Link>
            </ScaleUp>
            <ScaleUp intensity="low">
                <S.Link href="/blog">blog</S.Link>
            </ScaleUp>
        </S.LinkGroup>
        <S.Link href="/">
            <S.Logo>{'<peam />'}</S.Logo>
        </S.Link>
        <S.LinkGroup space="2rem">
            <ScaleUp intensity="low">
                <S.ExternalLink href={_references['github']} target="_blank" >
                    <FaGithub size={28}/>
                </S.ExternalLink>
            </ScaleUp>
            <ScaleUp intensity="low">
                <S.ExternalLink href={_references['linkedin']} target="_blank" >
                    <FaLinkedin size={28}/>
                </S.ExternalLink>
            </ScaleUp>
            <ScaleUp intensity="low">
                <S.ExternalLink href={_references['dev']} target="_blank" >
                    <FaDev size={28}/>
                </S.ExternalLink>
            </ScaleUp>
            <ScaleUp intensity="low">
                <S.ExternalLink href={_references['mail']} target="_blank" >
                    <FaMailBulk size={28}/>
                </S.ExternalLink>
            </ScaleUp>
        </S.LinkGroup>
    </S.Wrapper>
))

Navigation.displayName =  '__Navigation__'

export {
    Navigation
}