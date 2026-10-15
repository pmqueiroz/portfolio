import styled from 'styled-components'

import { sunken } from '../../styles/bevel'

const Digits = styled.span<{ $ink: string }>`
   display: inline-block;
   padding: 1px 3px;
   background: #000;
   ${sunken}
   font-family: 'Courier New', monospace;
   font-size: 22px;
   font-weight: 700;
   line-height: 1;
   letter-spacing: 1px;
   color: ${({ $ink }) => $ink};
   text-shadow: 0 0 4px ${({ $ink }) => $ink};
   font-variant-numeric: tabular-nums;
`

interface LedCounterProps {
   value: number
   digits?: number
   ink?: string
   label: string
}

const pad = (value: number, digits: number) => {
  const clamped = Math.max(-(10 ** (digits - 1) - 1), Math.min(10 ** digits - 1, Math.round(value)))
  return clamped < 0 ? `-${String(-clamped).padStart(digits - 1, '0')}` : String(clamped).padStart(digits, '0')
}

export const LedCounter = ({ value, digits = 3, ink = '#ff0000', label }: LedCounterProps) => (
  <Digits $ink={ink} role="status" aria-label={`${label}: ${Math.round(value)}`}>
    {pad(value, digits)}
  </Digits>
)
