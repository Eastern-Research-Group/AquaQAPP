module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'import/extensions': [
      'error',
      {
        vue: 'never',
      },
    ],
    'import/no-dynamic-require': 'off',
    'global-require': 0,
    'no-shadow': [
      'error',
      {
        allow: ['state', 'getters'],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    gtag: false,
  },
};
