import styled from 'styled-components'
import { toRem } from '../../helpers'

interface ScaleUpProps {
  intensity?: 'tiny' | 'low' | 'medium' | 'high'
}

const intensityMap: Record<Required<ScaleUpProps>['intensity'], string> = {
  tiny: toRem(-4),
  low: toRem(-8),
  medium: toRem(-16),
  high: toRem(-24)
}

export const ScaleUp = styled.div<ScaleUpProps>`
  & {
    transform: translateY(0);
    transition: transform 0.5s ease-in-out;
    height: 100%;

    &:hover {
      transform: ${({ intensity }) => `translateY(${intensityMap[intensity || 'medium']})`};
    }
  }
`
