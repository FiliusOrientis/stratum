'use strict'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'kebab-case'],
  },
}
