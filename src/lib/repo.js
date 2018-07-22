const octokit = require('@octokit/rest')({
  timeout: 0,
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3'
  },
  baseUrl: 'https://api.github.com',
  agent: undefined
})

let username
let password

class Repo {
  constructor(user, pass) {
    username = user
    password = pass

    octokit.authenticate({
      type: 'basic',
      username,
      password
    })
  }

  async get(name) {
    try {
      const { data } = await octokit.repos.get({
        owner: username,
        repo: name,
        headers: {
          accept: 'application/vnd.github.mercy-preview+json'
        }
      })
      return data
    } catch (err) {
      throw err
    }
  }

  async create(name) {
    try {
      const { data } = await octokit.repos.create({
        owner: username,
        name
      })
      return data
    } catch (err) {
      throw err
    }
  }

  async delete(name) {
    return octokit.repos.delete({ owner: username, repo: name })
  }
}

module.exports = Repo
