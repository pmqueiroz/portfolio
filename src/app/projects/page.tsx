import { Suspense } from 'react'
import { ProjectsWindow } from './projects-window'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProjectsWindow />
    </Suspense>
  )
}
