module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  env: {
    es6: true
  },
  plugins: [
    'node',
    'standard',
    'prettier'
  ],
  extends: [
    'plugin:import/warnings',
    'standard',
    'prettier',
    'prettier/standard'
  ],
  rules: {
    'space-before-function-paren': ['error', 'always']
  }
}
