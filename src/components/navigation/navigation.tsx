import { useWindowSize } from 'react-use'
import { If, Then, Else } from 'react-if'
import { FaGithub, FaLinkedin, FaDev, FaMailBulk, FaGripLines } from 'react-icons/fa'
import { Divider, Flex, ScaleUp } from '..'

import * as S from './styles'
import { theme } from '../../styles/theme'

const _references = {
    github: 'https://github.com/pmqueiroz',
    linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
    dev: 'https://dev.to/pmqueiroz',
    mail: 'mailto:contato@pmqueiroz.com'
}

const Links = ({ isSmallSize }: { isSmallSize: boolean }) => (
    <Flex direction={isSmallSize ? 'column' : 'row'} gap="2rem" align="center" >
        <ScaleUp intensity="low">
            <S.Link href="/projects">projects</S.Link>
        </ScaleUp>
        <ScaleUp intensity="low">
            <S.Link href="/blog">blog</S.Link>
        </ScaleUp>
    </Flex>
)

const Social = () => (
    <Flex direction="row" gap="2rem" align="center" justify='center'>
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
    </Flex>
)

const Menu = ({ isOpen, callback }: { isOpen: boolean, callback: () => void }) => (
    <S.MenuWrapper isOpen={isOpen} >
        <Flex as="h2" onClick={callback}>
            voltar
        </Flex>
        <Divider />
        <Links isSmallSize />
        <Divider />
        <Social />
    </S.MenuWrapper>
)

interface NavigationProps {
    isOpen: boolean
    toggleOpen: (next: boolean) => void
}

const Navigation = (props: NavigationProps) => {
    const { isOpen: isMenuOpen, toggleOpen: toggleMenuOpen } = props
    const { width } = useWindowSize()

    const isSmallSize = width < theme.global.breakpoints.mobile

    return (
        <S.Wrapper >
            <If condition={!isSmallSize}>
                <Then>
                    <Links isSmallSize={false} />
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
                <Then>
                    <Social />
                </Then>
            </If>
        </S.Wrapper>
    )}

Navigation.displayName =  '__Navigation__'

export {
    Navigation
}