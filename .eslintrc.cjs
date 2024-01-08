module.exports = {
  'env': {
    'es2021': true,
    'node': true,
    'mocha': true,
    'browser': false,
  },
  'extends': [
    'google',
    'eslint:recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': ['error', {
      'objects': 'always-multiline',
      'functions': 'never',
      'arrays': 'always-multiline',
    }],
    'max-len': ['error', { 'code': 120 }],
    'require-jsdoc': 'off',
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2, {
      'CallExpression': { 'arguments': 1 },
      'SwitchCase': 1,
    }],
    'arrow-parens': ['error', 'as-needed'],
    'prefer-destructuring': 'error',
    'sort-imports': 'error',
    'no-use-before-define': ['error', {
      'functions': false,
    }]
  },
};
