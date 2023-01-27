module.exports = {
	'env': {
		'browser': true,
		'node': true,
		'es2022': true,
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 13
	},
	'rules': {
		'no-console': 'off',
		//* Avoid Bugs
		'no-undef': 'off',
		'semi': 'error',
		'semi-spacing': 'error',
		//* Best Practices
		'eqeqeq': 'warn',
		'no-invalid-this': 'error',
		'no-return-assign': 'error',
		'no-unused-expressions': ['error', { 'allowTernary': true }],
		'no-useless-concat': 'error',
		'no-useless-return': 'error',
		'no-constant-condition': 'warn',
		'no-unused-vars': 'off',
		//* Enhance Readability
		'indent': ['error', 'tab', { 'SwitchCase': 2 }],
		'no-mixed-spaces-and-tabs': 'warn',
		'space-before-blocks': 'error',
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['warn', 'always'],
		'quotes': ['error', 'single'],
		//
		'max-len': ['error', { 'code': 200 }],
		'max-lines': ['error', { 'max': 500 }],
		'keyword-spacing': 'error',
		'multiline-ternary': ['error', 'never'],
		'no-mixed-operators': 'error',
		//
		'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': 'error',
		'object-property-newline': [
			'error',
			{ 'allowAllPropertiesOnSameLine': true }
		],
		//* ES6
		'arrow-spacing': 'error',
		'no-confusing-arrow': 'error',
		'no-duplicate-imports': 'error',
		'no-var': 'error',
		'object-shorthand': 'off',
		'prefer-const': 'error',
		'prefer-template': 'warn'
	}
};
