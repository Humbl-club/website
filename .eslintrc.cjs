/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    'no-new': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
}
