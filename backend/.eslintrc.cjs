module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
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
    'consistent-return': 'off',
    'dot-notation': 'off',
    'no-extra-semi': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  overrides: [
    {
      // We lint unit tests differently.
      files: ['*.spec.ts'],
      rules: {
        // Avoid mocha/chai "Expected an assignment or src call and instead saw an expression"
        'no-unused-expressions': 'off',
        // Avoid "* should be listed in the project's dependencies, not devDependencies"
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
