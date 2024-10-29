module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:react-hooks/recommended',
		'standard-with-typescript',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['react', 'autofix'],
	settings: {
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: './',
		},
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx', 'js', 'cjs'],
				moduleDirectory: ['src', 'node_modules'],
			},
			typescript: {},
		},

		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['src/__generated__/*.ts'],
	rules: {
		'arrow-body-style': ['error', 'as-needed'],
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true,
			},
		],
		'autofix/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				ignoreRestSiblings: true,
				destructuredArrayIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
			},
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
				pathGroups: [
					{
						pattern: '@/**/**',
						group: 'parent',
						position: 'before',
					},
				],
				alphabetize: {
					order: 'asc',
				},
			},
		],
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/return-await': 'off',
		'no-return-await': 'error',
		'@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true }],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					arguments: false,
					attributes: false,
				},
			},
		],
		// This rule is off because for some reason it has problems with booleans, for example in CandidateCardListItem at this condition:
		// "candidate.isLeading &&..."
		'@typescript-eslint/strict-boolean-expressions': 'off',
	},
	overrides: [
		{
			files: ['**/*.test.tsx'],
			rules: {
				'@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }],
			},
		},
	],
};
