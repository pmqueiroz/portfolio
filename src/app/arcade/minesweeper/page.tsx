'use client'

import { Minesweeper } from '../../../components/minesweeper'
import { Window } from '../../../components/window'

const backToArcade = [{ label: 'File', items: [{ label: 'Back to arcade', href: '/arcade' }] }]

export default function Page() {
  return (
    <Window title="minesweeper" section="arcade" path="/arcade/minesweeper" menus={backToArcade}>
      <Minesweeper />
    </Window>
  )
}
