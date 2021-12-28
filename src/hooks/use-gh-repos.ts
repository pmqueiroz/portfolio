import { AxiosResponse } from 'axios'
import dynamicTemplate from 'dynamic-string'
import { useQuery } from 'react-query'

import { githubApi } from '../service'
import { GHRepo } from '../types'

export const useGithubRepos = (username: string) => {
    const { data: axiosResponse, ...restQuery } = useQuery(
        ['github-repos', username], 
        () => githubApi({ url: dynamicTemplate('/users/${username}/repos', { username }) }) as Promise<AxiosResponse<GHRepo[]>> | undefined, {
            enabled: Boolean(username)
        })
    return { repos: axiosResponse?.data , ...restQuery }
}