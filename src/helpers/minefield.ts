export interface Cell {
  mine: boolean
  open: boolean
  flag: boolean
  near: number
}

export type Field = Cell[][]

export const fieldSize = { rows: 9, cols: 9, mines: 10 }

const neighbours = (field: Field, r: number, c: number) => {
  const out: [number, number][] = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr
      const nc = c + dc
      if ((dr || dc) && field[nr]?.[nc]) out.push([nr, nc])
    }
  }
  return out
}

export const emptyField = (): Field =>
  Array.from({ length: fieldSize.rows }, () =>
    Array.from({ length: fieldSize.cols }, () => ({ mine: false, open: false, flag: false, near: 0 }))
  )

export const layMines = (field: Field, safeRow: number, safeCol: number): Field => {
  const next = field.map(row => row.map(cell => ({ ...cell })))
  const isSafe = (r: number, c: number) => Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1
  let laid = 0
  while (laid < fieldSize.mines) {
    const r = Math.floor(Math.random() * fieldSize.rows)
    const c = Math.floor(Math.random() * fieldSize.cols)
    if (next[r][c].mine || isSafe(r, c)) continue
    next[r][c].mine = true
    laid++
  }
  next.forEach((row, r) => row.forEach((cell, c) => {
    cell.near = neighbours(next, r, c).filter(([nr, nc]) => next[nr][nc].mine).length
  }))
  return next
}

export const reveal = (field: Field, row: number, col: number): Field => {
  const next = field.map(r => r.map(cell => ({ ...cell })))
  const queue: [number, number][] = [[row, col]]
  let current = queue.pop()
  for (; current; current = queue.pop()) {
    const [r, c] = current
    const cell = next[r][c]
    if (cell.open || cell.flag) continue
    cell.open = true
    if (!cell.mine && cell.near === 0) queue.push(...neighbours(next, r, c))
  }
  return next
}

export const chord = (field: Field, row: number, col: number): Field => {
  const cell = field[row][col]
  const around = neighbours(field, row, col)
  const flags = around.filter(([r, c]) => field[r][c].flag).length
  if (!cell.open || cell.near === 0 || flags !== cell.near) return field
  return around.reduce((acc, [r, c]) => reveal(acc, r, c), field)
}

export const toggleFlag = (field: Field, row: number, col: number): Field =>
  field.map((r, ri) => r.map((cell, ci) =>
    ri === row && ci === col && !cell.open ? { ...cell, flag: !cell.flag } : cell
  ))

export const exploded = (field: Field) => field.some(row => row.some(cell => cell.mine && cell.open))

export const cleared = (field: Field) => field.every(row => row.every(cell => cell.mine || cell.open))

export const flagsPlaced = (field: Field) => field.flat().filter(cell => cell.flag).length
