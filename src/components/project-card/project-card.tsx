import { FaBook, FaStar } from 'react-icons/fa'
import { Flex } from '..'

import { GHRepo } from '../../types'

import * as S from './styles'

interface ProjectCardProps {
   repo: GHRepo
}

export const ProjectCard = (props: ProjectCardProps) => {
    const { repo } = props

    return (
        <a href={repo.html_url} target="_blank" rel="noreferrer">
            <S.Wrapper>
                <Flex gap="0.5rem" align="center">
                    <FaBook />
                    {repo.name}
                </Flex>
                <S.DescriptionWrapper>
                    <S.Description >
                        {repo.description}
                    </S.Description>
                </S.DescriptionWrapper>
                <Flex gap="1rem" align="center">
                    <Flex gap="0.5rem" align="center">
                        <S.LanguageColor color={repo.language} />
                        {repo.language}
                    </Flex>
                    <Flex gap="0.5rem" align="center">
                        <FaStar />
                        {repo.stargazers_count}
                    </Flex>
                </Flex>
            </S.Wrapper>
        </a>
    )
}
