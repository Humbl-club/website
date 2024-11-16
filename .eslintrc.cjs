/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
}
