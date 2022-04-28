module.exports = {
	rootDir: '../',
	collectCoverageFrom: [
	  'src/**/*.{js,jsx,ts,tsx}',
	  '!src/index.js',
	  '!src/drivers/cognito/index.js',
	  '!src/drivers/cognito/adapter.js',
	],
	coverageThreshold: {
	  global: {
		branches: 80,
		functions: 80,
		lines: 80,
		statements: 80,
	  },
	},
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/tests/**/*.js?(x)',
	  ],
  };