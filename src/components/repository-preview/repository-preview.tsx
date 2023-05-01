import { FaBook, FaTimes } from 'react-icons/fa'
import reactHtmlParser from 'react-html-parser'

import * as S from './styles'
import { Flex } from '..'
import { theme } from '../../styles/theme'

import { GHRepo } from '../../types'
import { If } from 'react-if'
import { useRepoReadme } from '../../hooks'
import { parseEmojis } from '../../helpers/parse-emojis'
interface PreviewProps {
   repo: GHRepo
   onClose(): void
}

export const RepositoryPreview = ({ repo, onClose }: PreviewProps) => {
    const { readme } = useRepoReadme(repo.full_name)

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
                <Flex align='center' justify='center' gap='.5rem'>
                    <S.Link href={repo.html_url} target='_blank' rel="noreferrer" >open in github</S.Link>
                    <Flex 
                        onClick={onClose}
                        align='center'
                        justify='center'
                        style={{ padding: '.5rem', cursor: 'pointer' }}
                    >
                        <FaTimes fill={theme.colors.red} size={18}></FaTimes>
                    </Flex>
                </Flex>
            </S.Header>
            <If condition={Boolean(readme)}>
                <Flex direction='column' gap='1rem' style={{ maxWidth: '100%' }}>{reactHtmlParser(parseEmojis(readme))}</Flex>
            </If>
        </S.Wrapper>
    )
}
