module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    "max-len": ["error", {"code": 120}],
    "require-jsdoc": "off",
    "object-curly-spacing": ["error", "always"],
    "indent": ["error", 2, {
      "CallExpression": {"arguments": 1},
      "SwitchCase": 1,
    }],
    "arrow-parens": ["error", "as-needed"],
  },
};
