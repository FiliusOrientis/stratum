'use strict'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 50],
    'scope-case': [2, 'always', 'kebab-case'],
  },
}
