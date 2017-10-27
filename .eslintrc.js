// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'development' ? 0 : 2
  }
}
