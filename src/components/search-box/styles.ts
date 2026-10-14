import styled from 'styled-components'
import { TextField } from '../text-field'

export const Form = styled.form`
   display: flex;
   gap: 4px;
   align-items: center;
   min-width: 0;

   button {
      min-width: 0;
      padding-left: 10px;
      padding-right: 10px;
   }
`

export const Field = styled(TextField)`
   flex: 1;
`
