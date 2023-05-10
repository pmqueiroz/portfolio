import { useWindowSize } from 'react-use'
import { If, Then, Else } from 'react-if'
import { FaGripLines } from 'react-icons/fa'
import { SiBuymeacoffee, SiGithub, SiLinkedin, SiMaildotru } from 'react-icons/si'
import { Divider, Flex, ScaleUp } from '..'

import * as S from './styles'
import { theme } from '../../styles/theme'
import Image from 'next/image'

const _references = {
    github: 'https://github.com/pmqueiroz',
    linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
    mail: 'mailto:contact@pmqueiroz.dev',
    bmc: 'buymeacoffee.com/pmqueiroz'
}

const Links = ({ isSmallSize }: { isSmallSize: boolean }) => (
    <Flex direction={isSmallSize ? 'column' : 'row'} gap="2rem" align="center" >
        <ScaleUp intensity="low">
            <S.Link href="/about">about</S.Link>
        </ScaleUp>
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
                <SiBuymeacoffee size={28}/>
            </S.ExternalLink>
        </ScaleUp>
        <ScaleUp intensity="low">
            <S.ExternalLink href={_references['github']} target="_blank" >
                <SiGithub size={28}/>
            </S.ExternalLink>
        </ScaleUp>
        <ScaleUp intensity="low">
            <S.ExternalLink href={_references['linkedin']} target="_blank" >
                <SiLinkedin size={28}/>
            </S.ExternalLink>
        </ScaleUp>
        <ScaleUp intensity="low">
            <S.ExternalLink href={_references['mail']} target="_blank" >
                <SiMaildotru size={28}/>
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
                <Image src="/logo.svg" width="150" height="150" alt="peam" ></Image>
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
