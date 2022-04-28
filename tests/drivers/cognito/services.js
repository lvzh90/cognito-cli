const services = require('../../../src/drivers/cognito/services');
const { awsAdapter  } = require('../../utils/mocks') ;
const { faker } = require('@faker-js/faker');

describe('Cognito Services', () => {
	const signUpMock = jest.fn()
		.mockImplementationOnce(cb => cb(null, true));
	const adapterMock = awsAdapter({ signUpMock });

	const { signUp, verify, signIn } = services(adapterMock);

	afterEach(() => {
		signUpMock.mockReset();
		adapterMock.initAWS.mockReset();
		adapterMock.setCognitoAttributeList.mockReset();
		adapterMock.getUserPool.mockReset();
		adapterMock.getCognitoAttributeList.mockReset();
	})

	describe('SignUp', () => {
		it('GIVEN an username, email and password WHEN the function is called with a valid password THEN the function should create an user', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const email = faker.internet.email();
			const password = faker.internet.password();
			signUpMock((err, val) => console.log('data', { err, val }))

			//Act
			const response = await signUp(username, email, password);
			console.log('response: ', response)
			//Assert
			expect(adapterMock.initAWS).toHaveBeenCalled();
			expect(adapterMock.setCognitoAttributeList).toHaveBeenCalled();	
			expect(adapterMock.getUserPool).toHaveBeenCalled();
			expect(adapterMock.signUpMock).toHaveBeenCalled();
			expect(adapterMock.getCognitoAttributeList).toHaveBeenCalled();
		})
	})
})