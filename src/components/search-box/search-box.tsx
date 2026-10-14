'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { BevelButton } from '../bevel-button'

import * as S from './styles'

interface SearchBoxProps {
   defaultValue?: string
   className?: string
}

export const SearchBox = ({ defaultValue = '', className }: SearchBoxProps) => {
  const router = useRouter()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = String(new FormData(e.currentTarget).get('q') ?? '').trim()
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <S.Form role="search" action="/search" onSubmit={submit} className={className}>
      <S.Field
        key={defaultValue}
        type="search"
        size={1}
        name="q"
        aria-label="Search the site"
        placeholder="posts, projects…"
        defaultValue={defaultValue}
      />
      <BevelButton type="submit">Go</BevelButton>
    </S.Form>
  )
}
