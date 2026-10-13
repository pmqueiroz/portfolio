import moment from 'moment'
import { ColophonWindow } from './colophon-window'

export default function Page() {
  const age = moment().diff(moment('04/11/2000', 'MM/DD/YYYY'), 'years')

  return <ColophonWindow age={age} />
}
