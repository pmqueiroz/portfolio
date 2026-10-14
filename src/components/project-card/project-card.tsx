import { GHRepo } from '../../types'
import { stampMeta } from '../../helpers/stamp'

import * as S from './styles'

interface ProjectCardProps {
   repo: GHRepo
   index: number
   visited: boolean
   onClick(repo: GHRepo): void
}

export const ProjectCard = ({ repo, index, visited, onClick }: ProjectCardProps) => {
  const meta = stampMeta(repo, index)

  return (
    <S.Card type="button" onClick={() => onClick(repo)} aria-label={`${meta.name}${visited ? ', opened' : ''}`}>
      <S.Head>
        <S.Icon aria-hidden style={{ background: meta.ink }}>{meta.glyph}</S.Icon>
        <S.Name $visited={visited}>{meta.name}</S.Name>
      </S.Head>
      <S.Blurb>{meta.blurb}</S.Blurb>
      <S.Foot>
        <span>{meta.lang}</span>
        <span>{visited ? 'OPENED' : 'NEW'}</span>
      </S.Foot>
    </S.Card>
  )
}
