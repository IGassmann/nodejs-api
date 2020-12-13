module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'rewrite',
        'perf',
        'docs',
        'style',
        'test',
        'build',
        'config',
        'chore',
        'revert',
      ],
    ],
  },
};
