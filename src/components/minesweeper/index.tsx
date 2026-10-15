'use client'

import { MouseEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { chord, cleared, emptyField, exploded, Field, fieldSize, flagsPlaced, layMines, reveal, toggleFlag } from '../../helpers/minefield'
import { raised, sunken } from '../../styles/bevel'
import { theme } from '../../styles/theme'
import { LedCounter } from '../led-counter'

type Phase = 'ready' | 'playing' | 'won' | 'lost'

const numberInks = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080']

const faces: Record<Phase, string> = { ready: '🙂', playing: '🙂', won: '😎', lost: '😵' }

const Board = styled.div`
   display: inline-flex;
   flex-direction: column;
   gap: 6px;
   padding: 6px;
   background: ${theme.colors.base};
   ${raised}
   user-select: none;
`

const Head = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 4px 6px;
   ${sunken}
`

const Face = styled.button`
   width: 30px;
   height: 30px;
   font-size: 18px;
   line-height: 1;
   background: ${theme.colors.base};
   cursor: pointer;
   ${raised}

   &:active {
      border-color: ${theme.colors.shadow};
      box-shadow: none;
   }
`

const Grid = styled.div`
   display: grid;
   grid-template-columns: repeat(${fieldSize.cols}, 24px);
   ${sunken}
   border-width: 3px;
`

const Square = styled.button<{ $open: boolean; $boom: boolean; $ink: string }>`
   width: 24px;
   height: 24px;
   font-family: 'Courier New', monospace;
   font-size: 15px;
   font-weight: 700;
   line-height: 1;
   color: ${({ $ink }) => $ink};
   background: ${theme.colors.base};
   cursor: default;
   ${({ $open, $boom }) => $open
    ? css`
         border: none;
         border-right: 1px solid ${theme.colors.shadow};
         border-bottom: 1px solid ${theme.colors.shadow};
         background: ${$boom ? '#ff0000' : theme.colors.base};
      `
    : raised}
`

const Controls = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   font-size: 12px;
`

const glyphFor = (cell: Field[number][number], phase: Phase) => {
  if (cell.flag && phase === 'lost' && !cell.mine) return '❌'
  if (cell.flag) return '🚩'
  if (!cell.open) return phase === 'lost' && cell.mine ? '💣' : ''
  if (cell.mine) return '💣'
  return cell.near ? String(cell.near) : ''
}

export const Minesweeper = () => {
  const [field, setField] = useState<Field>(emptyField)
  const [phase, setPhase] = useState<Phase>('ready')
  const [seconds, setSeconds] = useState(0)
  const [flagMode, setFlagMode] = useState(false)

  useEffect(() => {
    if (phase !== 'playing') return
    const timer = setInterval(() => setSeconds(s => Math.min(999, s + 1)), 1000)
    return () => clearInterval(timer)
  }, [phase])

  const restart = () => {
    setField(emptyField())
    setPhase('ready')
    setSeconds(0)
  }

  const settle = (next: Field) => {
    setField(next)
    if (exploded(next)) setPhase('lost')
    else if (cleared(next)) setPhase('won')
  }

  const over = phase === 'won' || phase === 'lost'

  const open = (r: number, c: number) => {
    if (over) return
    if (flagMode) return settle(toggleFlag(field, r, c))
    if (phase === 'ready') {
      setPhase('playing')
      return settle(reveal(layMines(field, r, c), r, c))
    }
    const cell = field[r][c]
    settle(cell.open ? chord(field, r, c) : reveal(field, r, c))
  }

  const flag = (e: MouseEvent, r: number, c: number) => {
    e.preventDefault()
    if (over || phase === 'ready') return
    setField(toggleFlag(field, r, c))
  }

  return (
    <Board>
      <Head>
        <LedCounter label="Mines left" value={fieldSize.mines - flagsPlaced(field)} />
        <Face type="button" aria-label="New game" onClick={restart}>{faces[phase]}</Face>
        <LedCounter label="Seconds" value={seconds} />
      </Head>
      <Grid role="grid" aria-label="Minefield" onContextMenu={e => e.preventDefault()}>
        {field.map((row, r) => row.map((cell, c) => (
          <Square
            key={`${r}-${c}`}
            type="button"
            $open={cell.open}
            $boom={cell.open && cell.mine}
            $ink={numberInks[cell.near]}
            aria-label={cell.open ? (cell.mine ? 'mine' : `${cell.near} nearby`) : cell.flag ? 'flagged' : 'hidden'}
            onClick={() => open(r, c)}
            onContextMenu={e => flag(e, r, c)}
          >
            {glyphFor(cell, phase)}
          </Square>
        )))}
      </Grid>
      <Controls>
        <label>
          <input type="checkbox" checked={flagMode} onChange={e => setFlagMode(e.target.checked)} /> 🚩 flag mode
        </label>
        <span role="status">{phase === 'won' ? 'You win!' : phase === 'lost' ? 'Boom.' : ''}</span>
      </Controls>
    </Board>
  )
}
