import styled from 'styled-components'

export const Grid = styled.div<{ min: string, gutter: string }>`
  display: grid;
  width: 100%;
  grid-gap: ${props => props.gutter};
  align-content: center;
  justify-items: center;

  grid-template-columns: repeat(auto-fit, minmax(min( ${props => props.min}, 100%), 1fr));
`
