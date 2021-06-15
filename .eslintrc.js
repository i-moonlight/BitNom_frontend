module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
  },
};
