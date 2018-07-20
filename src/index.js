require('dotenv').config()
const Repo = require('./lib/repo')
const uuidv1 = require('uuid/v1')

const user = process.env.GITHUB_USER
const password = process.env.GITHU_PASS

const repo = new Repo(user, password)

async function main() {
  try {
    const repoName = uuidv1()

    const { clone_url: created } = await repo.create(repoName)
    console.log('Repo created:', created)

    const { clone_url: read } = await repo.get(repoName)
    console.log('Repo read:', read)
  } catch (err) {
    console.log(err)
  }
}

main()
