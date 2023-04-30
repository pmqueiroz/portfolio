import { useEffect, useState } from 'react'
import { FaBook, FaTimes } from 'react-icons/fa'
import { marked } from 'marked'
import reactHtmlParser from 'react-html-parser'

import * as S from './styles'
import { Flex } from '..'
import { theme } from '../../styles/theme'

import { GHRepo } from '../../types'
import { If } from 'react-if'
interface PreviewProps {
   repo: GHRepo
   onClose(): void
}

export const RepositoryPreview = ({ repo, onClose }: PreviewProps) => {
    const [readme, setReadme] = useState(null)

    useEffect(() => {
        async function getReadme() {
            const response = await fetch(`https://raw.githubusercontent.com/${repo.full_name}/master/README.md`)
            if(response.ok) {
                const readme = await response.text()

                setReadme(marked.parse(readme, { gfm: true }))
            }
        }

        getReadme()
    }, [])

    return (
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
            <If condition={Boolean(readme)}>
                <Flex direction='column' gap='1rem'>{reactHtmlParser(readme)}</Flex>
            </If>
        </S.Wrapper>
    )
}
