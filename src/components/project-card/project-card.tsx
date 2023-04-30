import { FaBook, FaStar } from 'react-icons/fa'
import { Flex } from '..'

import { GHRepo } from '../../types'

import * as S from './styles'

interface ProjectCardProps {
   repo: GHRepo
   onClick(project: GHRepo): void
}

export const ProjectCard = ({ repo, onClick }: ProjectCardProps) => {
    return (
        <S.Wrapper onClick={() => onClick(repo)}>
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
    )
}
