import { AxiosResponse } from 'axios'
import { dynamicTemplate } from 'dynamic-string'
import { useQuery } from 'react-query'

import { githubApi } from '../service'
import { marked } from 'marked'

export const useRepoReadme = (repoFullName: string) => {
  const { data: axiosResponse, ...restQuery } = useQuery(
    ['repo-readme', repoFullName], 
    () => githubApi({ 
      baseURL: 'https://raw.githubusercontent.com/',
      url: dynamicTemplate('/${repoFullName}/master/readme.md', { repoFullName }) 
    }) as Promise<AxiosResponse<string>> | undefined, {
      enabled: Boolean(repoFullName)
    })
  return { readme: marked.parse(axiosResponse?.data || '', { gfm: true }) , ...restQuery }
}
