/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
      'import/no-import-module-exports': [0], // dumb
      'import/prefer-default-export': ['off'],
      'import/no-unresolved': [0], // just here while WIP
      quotes: [2, 'single', 'avoid-escape'], // this is nice
      'no-console': 'off', // Because container logging goes to stdout.
      'max-len': [2, { code: 150 }], // WHO USES A 117 line length?
      'guard-for-in': [0], // again really dumb, makes code near unreadable.
      'no-restricted-syntax': [0], // again really dumb, makes code near unreadable.
      'no-nested-ternary': [0], // on the rare occasion they're needed, they're needed
      'no-plusplus': [0], // plus plus is useful
      'arrow-body-style': [0], // This is stupid
      'no-param-reassign': [0], // just why
      'object-curly-newline': 'off',
      'no-shadow': 'off', // https://stackoverflow.com/questions/63961803
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'semi': 'always'
    }
};