import { FaBook, FaTimes } from 'react-icons/fa'
import { Flex } from '..'

import { GHRepo } from '../../types'

import * as S from './styles'
import { useEffect, useState } from 'react'
import { theme } from '../../styles/theme'

interface PreviewProps {
   repo: GHRepo
   onClose(): void
}

export const RepositoryPreview = ({ repo, onClose }: PreviewProps) => {
    // const [readme, setReadme] = useState(null)

    // useEffect(() => {
    //     async function getReadme() {
    //         const response = await fetch('https://raw.githubusercontent.com/pmqueiroz/dotfiles/master/readme.md')
    //         if(response.ok) {
    //             const readme = await response.text()

    //             console.log(readme)
    //         }
    //     }

    //     getReadme()
    // }, [])

    return (
        <>
            <S.Wrapper>
                <S.Header>
                    <Flex direction='column'>
                        <Flex gap=".5rem" align='center'>
                            <FaBook fill={theme.colors.gray} size={24} ></FaBook>
                            <S.RepoTitle>{repo.full_name}</S.RepoTitle>
                        </Flex>
                        <S.RepoDescription>{repo.description}</S.RepoDescription>
                    </Flex>
                    <Flex align='center' justify='center' gap='1rem'>
                        <S.Link href={repo.html_url} target='_blank' rel="noreferrer" >open in github</S.Link>
                        <FaTimes onClick={onClose} fill={theme.colors.red} size={18}></FaTimes>
                    </Flex>
                </S.Header>
            </S.Wrapper>
            <S.Dimmer visible={true} />
        </>
    )
}
