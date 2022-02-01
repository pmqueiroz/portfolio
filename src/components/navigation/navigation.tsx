import { useWindowSize } from 'react-use'
import { If, Then, Else } from 'react-if'
import { FaGithub, FaLinkedin, FaDev, FaMailBulk, FaGripLines } from 'react-icons/fa'
import { ScaleUp } from '..'

import * as S from './styles'
import { theme } from '../../styles/theme'
import { useState } from 'react'

const _references = {
    github: 'https://github.com/pmqueiroz',
    linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
    dev: 'https://dev.to/pmqueiroz',
    mail: 'mailto:contato@pmqueiroz.com'
}

const Links = () => (
    <S.LinkGroup space="2rem">
        <ScaleUp intensity="low">
            <S.Link href="/projects">projects</S.Link>
        </ScaleUp>
        <ScaleUp intensity="low">
            <S.Link href="/blog">blog</S.Link>
        </ScaleUp>
    </S.LinkGroup>
)

const Social = () => (
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
)

const Menu = ({ isOpen, callback }: { isOpen: boolean, callback: () => void }) => (
    <S.MenuWrapper isOpen={isOpen} onClick={callback} >
        <Links />
        <Social />
    </S.MenuWrapper>
)

const Navigation = () => {
    const [isMenuOpen, toggleMenuOpen] = useState(false)
    const { width } = useWindowSize()

    const isSmallSize = width < theme.global.breakpoints.mobile

    return (
        <S.Wrapper >
            <If condition={!isSmallSize}>
                <Then>
                    <Links />
                </Then>
                <Else>
                    <FaGripLines size={30} onClick={() => toggleMenuOpen(true)} />
                    <Menu isOpen={isMenuOpen} callback={() => toggleMenuOpen(false)} />
                </Else>
            </If>
            <S.Link href="/">
                <S.Logo>{'<peam />'}</S.Logo>
            </S.Link>
            <If condition={!isSmallSize}>
                <Social />
            </If>
        </S.Wrapper>
    )}

Navigation.displayName =  '__Navigation__'

export {
    Navigation
}