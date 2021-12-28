import styled from 'styled-components'
import { ProjectCard } from '../components'

import { withNavigation } from '../hocs'
import { useGithubRepos } from '../hooks'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

function Projects() {
    //const { repos } = useGithubRepos('pmqueiroz')

    const repo = {
        'id': 375124615,
        'node_id': 'MDEwOlJlcG9zaXRvcnkzNzUxMjQ2MTU=',
        'name': 'http-advices',
        'full_name': 'pmqueiroz/http-advices',
        'private': false,
        'owner': {
            'login': 'pmqueiroz',
            'id': 54639269,
            'node_id': 'MDQ6VXNlcjU0NjM5MjY5',
            'avatar_url': 'https://avatars.githubusercontent.com/u/54639269?v=4',
            'gravatar_id': '',
            'url': 'https://api.github.com/users/pmqueiroz',
            'html_url': 'https://github.com/pmqueiroz',
            'followers_url': 'https://api.github.com/users/pmqueiroz/followers',
            'following_url': 'https://api.github.com/users/pmqueiroz/following{/other_user}',
            'gists_url': 'https://api.github.com/users/pmqueiroz/gists{/gist_id}',
            'starred_url': 'https://api.github.com/users/pmqueiroz/starred{/owner}{/repo}',
            'subscriptions_url': 'https://api.github.com/users/pmqueiroz/subscriptions',
            'organizations_url': 'https://api.github.com/users/pmqueiroz/orgs',
            'repos_url': 'https://api.github.com/users/pmqueiroz/repos',
            'events_url': 'https://api.github.com/users/pmqueiroz/events{/privacy}',
            'received_events_url': 'https://api.github.com/users/pmqueiroz/received_events',
            'type': 'User',
            'site_admin': false
        },
        'html_url': 'https://github.com/pmqueiroz/http-advices',
        'description': ':man_facepalming: easily customizable react avatars components asjda aksjda aksjdaks aksdjaks aksjdaksda aksdjaksda  ajskdaskd  kasjdkasdask askdjaksdajksd',
        'fork': false,
        'url': 'https://api.github.com/repos/pmqueiroz/http-advices',
        'forks_url': 'https://api.github.com/repos/pmqueiroz/http-advices/forks',
        'keys_url': 'https://api.github.com/repos/pmqueiroz/http-advices/keys{/key_id}',
        'collaborators_url': 'https://api.github.com/repos/pmqueiroz/http-advices/collaborators{/collaborator}',
        'teams_url': 'https://api.github.com/repos/pmqueiroz/http-advices/teams',
        'hooks_url': 'https://api.github.com/repos/pmqueiroz/http-advices/hooks',
        'issue_events_url': 'https://api.github.com/repos/pmqueiroz/http-advices/issues/events{/number}',
        'events_url': 'https://api.github.com/repos/pmqueiroz/http-advices/events',
        'assignees_url': 'https://api.github.com/repos/pmqueiroz/http-advices/assignees{/user}',
        'branches_url': 'https://api.github.com/repos/pmqueiroz/http-advices/branches{/branch}',
        'tags_url': 'https://api.github.com/repos/pmqueiroz/http-advices/tags',
        'blobs_url': 'https://api.github.com/repos/pmqueiroz/http-advices/git/blobs{/sha}',
        'git_tags_url': 'https://api.github.com/repos/pmqueiroz/http-advices/git/tags{/sha}',
        'git_refs_url': 'https://api.github.com/repos/pmqueiroz/http-advices/git/refs{/sha}',
        'trees_url': 'https://api.github.com/repos/pmqueiroz/http-advices/git/trees{/sha}',
        'statuses_url': 'https://api.github.com/repos/pmqueiroz/http-advices/statuses/{sha}',
        'languages_url': 'https://api.github.com/repos/pmqueiroz/http-advices/languages',
        'stargazers_url': 'https://api.github.com/repos/pmqueiroz/http-advices/stargazers',
        'contributors_url': 'https://api.github.com/repos/pmqueiroz/http-advices/contributors',
        'subscribers_url': 'https://api.github.com/repos/pmqueiroz/http-advices/subscribers',
        'subscription_url': 'https://api.github.com/repos/pmqueiroz/http-advices/subscription',
        'commits_url': 'https://api.github.com/repos/pmqueiroz/http-advices/commits{/sha}',
        'git_commits_url': 'https://api.github.com/repos/pmqueiroz/http-advices/git/commits{/sha}',
        'comments_url': 'https://api.github.com/repos/pmqueiroz/http-advices/comments{/number}',
        'issue_comment_url': 'https://api.github.com/repos/pmqueiroz/http-advices/issues/comments{/number}',
        'contents_url': 'https://api.github.com/repos/pmqueiroz/http-advices/contents/{+path}',
        'compare_url': 'https://api.github.com/repos/pmqueiroz/http-advices/compare/{base}...{head}',
        'merges_url': 'https://api.github.com/repos/pmqueiroz/http-advices/merges',
        'archive_url': 'https://api.github.com/repos/pmqueiroz/http-advices/{archive_format}{/ref}',
        'downloads_url': 'https://api.github.com/repos/pmqueiroz/http-advices/downloads',
        'issues_url': 'https://api.github.com/repos/pmqueiroz/http-advices/issues{/number}',
        'pulls_url': 'https://api.github.com/repos/pmqueiroz/http-advices/pulls{/number}',
        'milestones_url': 'https://api.github.com/repos/pmqueiroz/http-advices/milestones{/number}',
        'notifications_url': 'https://api.github.com/repos/pmqueiroz/http-advices/notifications{?since,all,participating}',
        'labels_url': 'https://api.github.com/repos/pmqueiroz/http-advices/labels{/name}',
        'releases_url': 'https://api.github.com/repos/pmqueiroz/http-advices/releases{/id}',
        'deployments_url': 'https://api.github.com/repos/pmqueiroz/http-advices/deployments',
        'created_at': '2021-06-08T19:36:49Z',
        'updated_at': '2021-11-04T00:41:27Z',
        'pushed_at': '2021-06-11T02:45:09Z',
        'git_url': 'git://github.com/pmqueiroz/http-advices.git',
        'ssh_url': 'git@github.com:pmqueiroz/http-advices.git',
        'clone_url': 'https://github.com/pmqueiroz/http-advices.git',
        'svn_url': 'https://github.com/pmqueiroz/http-advices',
        'homepage': 'http://http-advices.herokuapp.com',
        'size': 45,
        'stargazers_count': 0,
        'watchers_count': 0,
        'language': 'Go',
        'has_issues': true,
        'has_projects': true,
        'has_downloads': true,
        'has_wiki': true,
        'has_pages': false,
        'forks_count': 0,
        'mirror_url': null,
        'archived': false,
        'disabled': false,
        'open_issues_count': 0,
        'license': null,
        'allow_forking': true,
        'is_template': false,
        'topics': [
            'go'
        ],
        'visibility': 'public',
        'forks': 0,
        'open_issues': 0,
        'watchers': 0,
        'default_branch': 'master'
    }

    return (
        <Wrapper>
            <ProjectCard repo={repo} />
        </Wrapper>
    )
}

export default withNavigation(Projects)
