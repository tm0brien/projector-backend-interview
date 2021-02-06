const prettierConfig = require('./.prettierrc.js')

module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true
        },
        sourceType: 'module'
    },
    globals: {
        assert: true,
        console: true,
        document: true,
        exports: true,
        gapi: true,
        google: true,
        mixpanel: true,
        module: false,
        expect: true,
        window: true,
        Image: true,
        fetch: true,
        Blob: true,
        URL: true
    },
    plugins: ['prettier'],
    overrides: [
        {
            files: ['*.ts'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
                'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
                'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
            ],
            rules: {
                'prettier/prettier': ['error', prettierConfig],
                'no-console': 2,
                curly: 2,
                'no-self-assign': 'off',
                'no-empty-pattern': 'off',
                'no-extra-boolean-cast': 'off',
                'no-prototype-builtins': 'off',
                'no-fallthrough': ['error', { commentPattern: 'break[\\s\\w]*omitted' }],
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/ban-types': 'off',
                '@typescript-eslint/no-array-constructor': 'off',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        accessibility: 'explicit',
                        overrides: {
                            constructors: 'off'
                        }
                    }
                ],
                '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
                '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
                '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true
                        }
                    }
                ],
                '@typescript-eslint/member-ordering': [
                    'error',
                    { default: ['static-field', 'static-method', 'instance-field', 'constructor', 'instance-method'] }
                ],
                'prefer-rest-params': 'off',
                'prefer-const': 'off'
            }
        },
        {
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            rules: {
                'prettier/prettier': ['error', prettierConfig]
            }
        }
    ]
}
