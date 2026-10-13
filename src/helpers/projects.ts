import { GHRepo } from '../types'

export const projectNames = [
  'dotfiles',
  'nova',
  'lumen-diff',
  'import-holmes',
  'nephrit',
  'memento',
  'umbra',
  'helloworld',
  'advent-of-code'
]

export const selectProjects = (repos?: GHRepo[]) =>
  projectNames
    .map(name => repos?.find(repo => repo.name === name))
    .filter((repo): repo is GHRepo => Boolean(repo))
