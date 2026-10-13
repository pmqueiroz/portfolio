export interface ReadmeLocation {
  path: string
  download_url: string
  html_url: string
}

const attribute = /(\s(src|href)=)(["'])(.*?)\3/gi
const absolute = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i

const root = (url: string, path: string) => url.slice(0, url.length - path.length)

export const resolveReadmeUrls = (html: string, { path, download_url, html_url }: ReadmeLocation) => {
  const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/') + 1) : ''
  const roots = { src: root(download_url, path), href: root(html_url, path) }

  return html.replace(attribute, (match, prefix: string, name: string, quote: string, target: string) => {
    if (!target || absolute.test(target)) return match
    const relative = target.startsWith('/') ? target.slice(1) : dir + target
    try {
      return `${prefix}${quote}${new URL(relative, roots[name.toLowerCase() as 'src' | 'href']).href}${quote}`
    } catch (e) {
      return match
    }
  })
}
