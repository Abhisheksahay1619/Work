/*
 *   Copyright (c) 2020 BuserNet Consulting LLC
 *   All rights reserved.
 */
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
  ],
  ignorePatterns: ['**/lib/*'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'func-names': 'off',
  },
  root: true,
  extends: [
    'plugin:vue/strongly-recommended',
    'plugin:vue/essential',
    'airbnb-base',
    '@vue/airbnb',
  ],
};
