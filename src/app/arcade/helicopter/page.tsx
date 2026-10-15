'use client'

import { Helicopter } from '../../../components/helicopter'
import { Window } from '../../../components/window'

const backToArcade = [{ label: 'File', items: [{ label: 'Back to arcade', href: '/arcade' }] }]

export default function Page() {
  return (
    <Window title="helicopter" section="arcade" path="/arcade/helicopter" menus={backToArcade}>
      <Helicopter />
    </Window>
  )
}
