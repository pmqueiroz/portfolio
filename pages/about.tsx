import styled from 'styled-components'
import Image from 'next/image'
import moment from 'moment'

import { withNavigation } from '../src/hocs'
import { theme } from '../src/styles/theme'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 5rem;
  width: 100%;
  flex-wrap: wrap;
  
  * > p, p {
     font-size: 1.2em;
     font-family: 'Cutive Mono', monospace;
  }

  p {
     &.typo {
         text-decoration: underline wavy ${({ theme }) => theme.colors.red};
         text-underline-offset: 5px;
         text-decoration-thickness: 1px;
     }
  }

  .bio {
     line-height: 1.5;
  }

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
  const age = moment().diff(moment('04/11/2000', 'MM/DD/YYYY'), 'years')

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src="/me.png" alt="me" width="200" height="200" />
      </ImageWrapper>
      <div className="bio">
        <p>
                    Pedro Queiroz, {age} years <br/>
                  front-end developer since 2017<br/>
                  living in Brazil
        </p>
        <p className="typo">{' '}typescripter</p>
      </div>
    </Wrapper>    )
}

export default withNavigation(Projects)
