module.exports = {
  '*.{vue,ts,js,json,md,yml,html,css,scss}': 'prettier --write',
  '*.{vue,ts,js}': 'eslint --fix',
  '**/{src,test}/**/*.{ts,js}': 'jest --bail --passWithNoTests --findRelatedTests',
};
