const { greets } = require('../../src/index')

describe('index', () => {
  it('greets', async () => {
    expect(greets()).to.equal('Hi there...')
  })
})
