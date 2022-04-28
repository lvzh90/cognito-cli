module.exports = {
	awsAdapter: ({ signUpMock }) => ({
		initAWS: jest.fn(),
		setCognitoAttributeList: jest.fn(),
		getUserPool: jest.fn(() => ({
			signUp: signUpMock
		})),
		getCognitoAttributeList: jest.fn(),
	})
}