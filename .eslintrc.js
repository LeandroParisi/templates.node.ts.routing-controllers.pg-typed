module.exports = {
  // ===========================================
  // Set up ESLint for .js / .jsx files
  // ===========================================
  // .js / .jsx uses babel-eslint
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  // parserOptions: {
  //   ecmaVersion: 12,
  // },
  ignorePatterns: ['seeders/', 'migrations/', 'src/models/index.js'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    semi: ['error', 'never'],
  },

  // =================================
  // Overrides for Specific Files
  // =================================
  overrides: [
    // Match TypeScript Files
    // =================================
    {
      files: ['**/*.{ts,tsx}'],

      // Global ESLint Settings
      // =================================
      env: {
        jest: true,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          typescript: {
            // project: './tsconfig.json',
          },
        },
      },

      // Parser Settings
      // =================================
      // allow ESLint to understand TypeScript syntax
      // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js#L10
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // Lint with Type Information
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },

      // Plugins
      // =================================
      plugins: [],

      // Extend Other Configs
      // =================================
      extends: [
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // 'plugin:import/errors',
        // 'plugin:import/warnings',
        // 'plugin:import/typescript',
        // 'airbnb-base',
        // "prettier",
      ],
      rules: {
        'import/no-unresolved': 0,
        'import/extensions': 0,
        '@typescript-eslint/no-this-alias': 0,
        semi: ['error', 'never'],
        // temp allowing during TS migration
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/unbound-method': 0,
        // '@typescript-eslint/no-unsafe-assignment': 0,
        // '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': 'allow-with-description',
            minimumDescriptionLength: 4,
          },
        ],
        'class-methods-use-this': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-duplicates': 0,
        'import/no-self-import': 0,
        'import/named': 0,
        'import/order': 0,
        'import/no-cycle': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'import/no-useless-path-segments': 0,
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'max-len': [1, 125, 2],
        'no-useless-constructor': 0,
      },
    },
  ],
}
