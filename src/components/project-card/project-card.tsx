'use client'

import { useState } from 'react'

import { GHRepo } from '../../types'
import { stampMeta } from '../../helpers/stamp'
import { StampFace } from '../stamp-face'

import * as S from './styles'

interface ProjectCardProps {
   repo: GHRepo
   index: number
   visited: boolean
   onClick(project: GHRepo): void
   variant?: 'featured' | 'full'
}

export const ProjectCard = ({ repo, index, visited, onClick, variant = 'full' }: ProjectCardProps) => {
  const [hover, setHover] = useState(false)
  const meta = stampMeta(repo, index)
  const peel = hover ? 26 : 0

  return (
    <S.Stamp
      onClick={() => onClick(repo)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <S.Face>
        <StampFace meta={meta} visited={visited} />
      </S.Face>
      <S.TitleRow>
        <S.Name>{meta.name}</S.Name>
        <S.Denom>{meta.denom}</S.Denom>
      </S.TitleRow>
      <S.Blurb $lines={variant === 'featured' ? 2 : 3}>{meta.blurb}</S.Blurb>
      <S.FootRow>
        <span>{meta.lang}</span>
        <span>{variant === 'featured' ? `'${meta.year}` : 'read →'}</span>
      </S.FootRow>
      <S.Perforation />
      <S.Peel $size={peel} />
    </S.Stamp>
  )
}
