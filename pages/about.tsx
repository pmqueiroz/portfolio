import styled from 'styled-components'
import Image from 'next/image'

import { withNavigation } from '../src/hocs'
import { theme } from '../src/styles/theme'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 5rem;
`

const ImageWrapper = styled.div`
   filter: grayscale(100%);
   background: ${theme.colors.gray};
   height: 200px;
   
   &::before {
      content: '';
      border: 1px solid ${theme.colors.darkGray};
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: -10px;
      right: -10px;
   }
`

function Projects() {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image src="/me.png" alt="me" width="200px" height="200px" />
            </ImageWrapper>
        </Wrapper>
    )
}

export default withNavigation(Projects)
