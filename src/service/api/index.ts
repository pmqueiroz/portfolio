import axios from 'axios'

export const githubApi = axios.create({
  baseURL: 'https://api.github.com'
})

export const cmsApi = axios.create({
  baseURL: 'https://cms.pmqueiroz.dev/api'
})
