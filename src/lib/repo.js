const fs = require('fs')
const util = require('util')
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

  async commit(repoName, file, pathInRepo, message, branch = 'master') {
    try {
      const readFile = util.promisify(fs.readFile)
      const buffer = await readFile(file)
      const content = buffer.toString('base64')

      return octokit.repos.createFile({
        owner: username,
        repo: repoName,
        path: pathInRepo,
        message,
        content,
        branch
      })
    } catch (err) {
      throw err
    }
  }
}

module.exports = Repo
