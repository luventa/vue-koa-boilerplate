module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended'
  ],
  // required to lint node files
  plugins: [
    'node'
  ],
  // add your custom rules here
  'rules': {
    "no-var": 1,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0
  }
}
