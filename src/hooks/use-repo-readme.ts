import { AxiosResponse } from 'axios'
import { dynamicTemplate } from 'dynamic-string'
import { useQuery } from 'react-query'

import { githubApi } from '../service'
import { marked } from 'marked'
import { ReadmeLocation, resolveReadmeUrls } from '../helpers/resolve-readme-urls'

interface ReadmeResponse extends ReadmeLocation {
  content: string
}

const decodeBase64 = (content: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(content.replace(/\s/g, '')), c => c.charCodeAt(0)))

export const useRepoReadme = (repoFullName: string) => {
  const { data: axiosResponse, ...restQuery } = useQuery(
    ['repo-readme', repoFullName],
    () => githubApi({
      url: dynamicTemplate('/repos/${repoFullName}/readme', { repoFullName })
    }) as Promise<AxiosResponse<ReadmeResponse>> | undefined, {
      enabled: Boolean(repoFullName)
    })

  const data = axiosResponse?.data
  const readme = data
    ? resolveReadmeUrls(marked.parse(decodeBase64(data.content), { gfm: true }), data)
    : ''

  return { readme, ...restQuery }
}
