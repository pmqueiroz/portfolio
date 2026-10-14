'use client'

import { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { BevelButton } from '../../components/bevel-button'
import { Panel } from '../../components/panel'
import { TextArea, TextField } from '../../components/text-field'
import { Kicker, Window } from '../../components/window'
import { useGuestbook } from '../../hooks'
import { shortDate } from '../../helpers/short-date'
import { theme } from '../../styles/theme'

const messageLimit = 500

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 8px 10px;
  align-items: center;
  padding: 12px;
  font-size: 12px;

  label {
    align-self: start;
    padding-top: 4px;
  }

  .trap {
    position: absolute;
    left: -9999px;
  }

  .count {
    grid-column: 2;
    margin-top: -4px;
    font-size: 11px;
    color: ${theme.colors.subtext};
  }

  .actions {
    grid-column: 2;
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .note {
    font-size: 12px;
  }
`

const Entries = styled.ol`
  list-style: none;

  li {
    padding: 10px 12px;
    border-top: 1px solid ${theme.colors.line};
  }

  li:first-child {
    border-top: none;
  }

  .byline {
    font-size: 11px;
    color: ${theme.colors.subtext};
  }

  .byline b {
    color: ${theme.colors.dark};
  }

  p {
    margin-top: 4px;
    font-family: ${theme.fonts.type};
    font-size: 15px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
`

const Notice = styled.p`
  padding: 12px;
  font-size: 13px;
  color: ${theme.colors.subtext};
`

export const GuestbookWindow = () => {
  const { entries, entriesError, isLoading, sign } = useGuestbook()
  const [message, setMessage] = useState('')

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    sign.mutate({
      name: String(data.get('name') ?? ''),
      website: String(data.get('website') ?? ''),
      message,
      homepage: String(data.get('homepage') ?? '')
    }, {
      onSuccess: () => {
        form.reset()
        setMessage('')
      }
    })
  }

  const status = isLoading || sign.isLoading ? 'Loading' : 'Done'

  return (
    <Window title="guestbook" section="guestbook" path="/guestbook" status={status}>
      <Stack>
        <Kicker>
          GUESTBOOK · {entries.length} {entries.length === 1 ? 'SIGNATURE' : 'SIGNATURES'}
        </Kicker>

        <Panel title="Sign my guestbook">
          <Form onSubmit={submit} onReset={() => setMessage('')}>
            <label htmlFor="guestbook-name">Name:</label>
            <TextField id="guestbook-name" name="name" required maxLength={40} autoComplete="nickname" />

            <label htmlFor="guestbook-website">Homepage:</label>
            <TextField id="guestbook-website" name="website" type="url" maxLength={100} placeholder="https:// (optional)" />

            <label htmlFor="guestbook-message">Message:</label>
            <TextArea
              id="guestbook-message"
              name="message"
              rows={4}
              required
              maxLength={messageLimit}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <span className="count">{message.length}/{messageLimit}</span>

            <input className="trap" name="homepage" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="actions">
              <BevelButton $default type="submit" disabled={sign.isLoading}>Sign</BevelButton>
              <BevelButton type="reset">Clear</BevelButton>
              {sign.isSuccess && <span className="note" role="status">✔ Thanks! Your entry shows up once I approve it.</span>}
              {sign.isError && <span className="note" role="alert">⚠ {(sign.error as Error).message}</span>}
            </div>
          </Form>
        </Panel>

        <Panel title="Signatures">
          {entriesError && <Notice>{entriesError.message}</Notice>}
          {!entriesError && isLoading && <Notice>Loading signatures…</Notice>}
          {!entriesError && !isLoading && entries.length === 0 && <Notice>No signatures yet — be the first!</Notice>}
          {entries.length > 0 && (
            <Entries>
              {entries.map((entry, i) => (
                <li key={entry.id}>
                  <div className="byline">
                    #{entries.length - i} · <b>{entry.name}</b>
                    {entry.website && (
                      <> · <a href={entry.website} target="_blank" rel="nofollow ugc noopener noreferrer">homepage ↗</a></>
                    )}
                    {' '}· {shortDate(entry.createdAt)}
                  </div>
                  <p>{entry.message}</p>
                </li>
              ))}
            </Entries>
          )}
        </Panel>
      </Stack>
    </Window>
  )
}
