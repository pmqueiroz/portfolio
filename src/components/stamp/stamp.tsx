import { GHRepo } from '../../types'
import { stampFace, stampMeta } from '../../helpers/stamp'

import { Emojify } from '../emoji'

import * as S from './styles'

interface StampProps {
   repo: GHRepo
   index: number
   visited: boolean
   onClick(repo: GHRepo): void
   size?: 'featured' | 'full'
}

export const Stamp = ({ repo, index, visited, onClick, size = 'full' }: StampProps) => {
  const meta = stampMeta(repo, index)
  const face = stampFace(meta, visited)

  return (
    <S.Stamp type="button" $size={size} onClick={() => onClick(repo)} aria-label={`${meta.name}, ${face.status.toLowerCase()}`}>
      <S.Face $size={size} style={{ background: face.ground, backgroundImage: face.pattern, color: face.ink }}>
        <S.Glyph $size={size} aria-hidden>{meta.glyph}</S.Glyph>
        <S.Denom>{meta.denom}</S.Denom>
        {size === 'featured' && <S.Status>{face.status}</S.Status>}
      </S.Face>
      <S.Name $size={size}>{meta.name}</S.Name>
      <S.Blurb $size={size}><Emojify text={meta.blurb} /></S.Blurb>
      {size === 'full' && (
        <S.Foot>
          <span>{meta.lang}</span>
          <span>{face.status}</span>
        </S.Foot>
      )}
      <S.Perforation aria-hidden />
    </S.Stamp>
  )
}
