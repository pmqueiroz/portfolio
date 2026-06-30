'use client'

import { usePathname } from 'next/navigation'

import * as S from './styles'

const _references = {
  github: 'https://github.com/pmqueiroz',
  linkedin: 'https://www.linkedin.com/in/pmqueiroz/',
  mail: 'mailto:contact@pmqueiroz.dev'
}

const _links = [
  { href: '/', label: 'index' },
  { href: '/projects', label: 'work' },
  { href: '/blog', label: 'journal' },
  { href: '/about', label: 'colophon' }
]

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const Navigation = () => {
  const pathname = usePathname() ?? '/'

  return (
    <S.Wrapper>
      <S.Inner>
        <S.NavLink href="/" style={{ borderBottom: 'none' }}>
          <S.Brand>
            <S.BrandName>PMQUEIROZ</S.BrandName>
            <S.BrandBadge>EST·2017</S.BrandBadge>
          </S.Brand>
        </S.NavLink>
        <S.Group>
          {_links.map(({ href, label }) => (
            <S.NavLink key={href} href={href} $active={isActive(pathname, href)}>
              {label}
            </S.NavLink>
          ))}
          <S.Sep />
          <S.Social href={_references.github} target="_blank" rel="noreferrer">GH</S.Social>
          <S.Social href={_references.linkedin} target="_blank" rel="noreferrer">IN</S.Social>
          <S.Social href={_references.mail}>@</S.Social>
        </S.Group>
      </S.Inner>
    </S.Wrapper>
  )
}

Navigation.displayName = '__Navigation__'

export {
  Navigation
}
