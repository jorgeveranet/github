module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  globals: {
    expect: true,
    sinon: true
  },
  plugins: ['prettier', 'mocha'],
  extends: [
    'eslint:recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'prettier/prettier': 'warn',
    'no-console': 'off'
  }
}
