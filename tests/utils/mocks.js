module.exports = {
	promisify: (bindMock) => jest.fn(() => ({
		bind: bindMock,
	})),
	awsAdapter: ({ signUpMock, confirmRegistrationMock }) => ({
		initAWS: jest.fn(),
		setCognitoAttributeList: jest.fn(),
		getUserPool: jest.fn(() => ({
			signUp: signUpMock
		})),
		getCognitoAttributeList: jest.fn(),
		getCognitoUser: jest.fn(() => ({
			confirmRegistration: confirmRegistrationMock 
		})),
	}),
	cognito: {
		signUp: jest.fn(),
		verify: jest.fn(),
		signIn: jest.fn()
	}
}