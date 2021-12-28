import styled from 'styled-components'

interface FlexProps {
   direction?: 'row' | 'column'
   justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
   align?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
   gap?: string
}

export const Flex = styled.div<FlexProps>`
   display: flex;
   flex-direction: ${props => props.direction || 'row'};
   justify-content: ${props => props.justify || 'start'};
   align-items: ${props => props.align || 'start'};
   gap: ${props => props.gap || '0'};
`