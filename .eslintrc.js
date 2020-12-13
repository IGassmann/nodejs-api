module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '_httpMessage', '_parsedOriginalUrl'] }],
    'class-methods-use-this': [
      'error',
      {
        'exceptMethods': [
          'provideConfigSpec',
          'configure',
          'catch',
          'canActivate',
          'transform',
          'intercept',
          'handleRequest',
          'onModuleInit',
        ],
      },
    ],
  },
};
