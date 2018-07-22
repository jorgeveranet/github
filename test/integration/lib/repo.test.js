const Repo = require('../../../src/lib/repo')
const uuidv1 = require('uuid/v1')

const user = process.env.GITHUB_USER
const password = process.env.GITHU_PASS_OR_PERSONAL_TOKEN
const repo = new Repo(user, password)

describe('repo lib', () => {
  it('creates, gets info, commit files and delete repo', async () => {
    try {
      const repoName = uuidv1()

      // repo is created
      const { clone_url: createdUrl } = await repo.create(repoName)
      expect(createdUrl, 'repo is created').to.equal(
        `https://github.com/${user}/${repoName}.git`
      )

      // gets info
      const { clone_url: infoUrl } = await repo.get(repoName)
      expect(infoUrl, 'gets info').to.be.equal(
        `https://github.com/${user}/${repoName}.git`
      )

      // commit files

      // delete repo
    } catch (err) {
      throw err
    }
  })
})
