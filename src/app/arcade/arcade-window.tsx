'use client'

import styled from 'styled-components'

import { BevelLink } from '../../components/bevel-button'
import { Panel } from '../../components/panel'
import { Kicker, Window } from '../../components/window'
import { games } from '../../helpers/games'
import { theme } from '../../styles/theme'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Games = styled.ul`
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
  }

  li + li {
    border-top: 1px solid ${theme.colors.line};
  }

  .icon {
    font-size: 32px;
  }

  .copy {
    flex: 1;
    font-size: 13px;
  }

  .copy b {
    display: block;
  }
`

export const ArcadeWindow = () => (
  <Window title="arcade" section="arcade" path="/arcade">
    <Stack>
      <Kicker>ARCADE · {games.length} GAMES · NO QUARTERS NEEDED</Kicker>
      <Panel title="Pick a game">
        <Games>
          {games.map(game => (
            <li key={game.href}>
              <span className="icon" aria-hidden="true">{game.icon}</span>
              <span className="copy">
                <b>{game.title}</b>
                {game.blurb}
              </span>
              <BevelLink $default href={game.href}>Play…</BevelLink>
            </li>
          ))}
        </Games>
      </Panel>
    </Stack>
  </Window>
)
