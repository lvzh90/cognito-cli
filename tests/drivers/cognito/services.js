const services = require('../../../src/drivers/cognito/services');
const { promisify, awsAdapter  } = require('../../utils/mocks') ;
const { faker } = require('@faker-js/faker');

describe('Cognito Services', () => {
	const signUpMock = jest.fn();
	const bindMock = jest.fn();
	const confirmRegistrationMock = jest.fn();
	const promisifyMock = promisify(bindMock);
	const adapterMock = awsAdapter({ signUpMock, confirmRegistrationMock });
	
	const { signUp, verify, signIn } = services(promisifyMock, adapterMock);
	
	afterEach(() => {
		jest.clearAllMocks();
	})
	
	describe('SignUp', () => {
		it('GIVEN an username, email and password WHEN the function is called with a valid password THEN the function should create an user', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const email = faker.internet.email();
			const password = faker.internet.password();
			const userConfirmed = false;
			const signUpResponse = {
				username,
				userConfirmed,
			}
			
			const signUpPromiseMock = jest.fn();
			bindMock.mockReturnValue(signUpPromiseMock);
			signUpPromiseMock.mockResolvedValue({
				userConfirmed,
				user: {
					username,
				}
			})

			//Act
			const response = await signUp(username, email, password);

			//Assert
			expect(adapterMock.initAWS).toHaveBeenCalled();
			expect(adapterMock.setCognitoAttributeList).toHaveBeenCalled();	
			expect(adapterMock.getUserPool).toHaveBeenCalled();
			expect(signUpPromiseMock).toHaveBeenCalledWith(username, password, adapterMock.getCognitoAttributeList(), null)
			expect(response).toEqual(signUpResponse);
		})

		it('GIVEN an username, email and password WHEN the function is called with a invalid password THEN the function should throw an InvalidPasswordException error', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const email = faker.internet.email();
			const password = faker.random.alpha(4);
			const errorMessage = {
				message: faker.random.words(3)
			}
			
			const signUpPromiseMock = jest.fn();
			bindMock.mockReturnValue(signUpPromiseMock);
			signUpPromiseMock.mockRejectedValue(errorMessage);

			//Assert
			await expect(signUp(username, email, password)).rejects.toEqual(errorMessage)
			expect(adapterMock.initAWS).toHaveBeenCalled();
			expect(adapterMock.setCognitoAttributeList).toHaveBeenCalled();	
			expect(adapterMock.getUserPool).toHaveBeenCalled();
			expect(signUpPromiseMock).toHaveBeenCalledWith(username, password, adapterMock.getCognitoAttributeList(), null)
		})
	})

	describe('Verify', () => {
		it('GIVEN an username and verification code WHEN the function is called with a valid code THEN the function should verify an user', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const code = faker.datatype.number();
			const verifyResponse = 'SUCCESS';

			const confirmRegistrationPromiseMock = jest.fn();
			bindMock.mockReturnValue(confirmRegistrationPromiseMock);
			confirmRegistrationPromiseMock.mockResolvedValue(verifyResponse);

			//Act
			const response = await verify(username, code);

			//Assert
			expect(adapterMock.getCognitoUser).toHaveBeenCalled();
			expect(confirmRegistrationPromiseMock).toHaveBeenCalledWith(code, true)
			expect(response).toEqual(verifyResponse);	
		})

		it('GIVEN an username and verification code WHEN the function is called with a invalid code THEN the function should return undefined', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const code = faker.datatype.number();
			const verifyResponse = 'undefined';

			const confirmRegistrationPromiseMock = jest.fn();
			bindMock.mockReturnValue(confirmRegistrationPromiseMock);
			confirmRegistrationPromiseMock.mockResolvedValue(verifyResponse);

			//Act
			const response = await verify(username, code);

			//Assert
			expect(adapterMock.getCognitoUser).toHaveBeenCalled();
			expect(confirmRegistrationPromiseMock).toHaveBeenCalledWith(code, true)
			expect(response).toEqual(verifyResponse);	
		})

		it('GIVEN an username and verification code WHEN the function failed in a unespected way THEN the function should throw an error', async () => {
			//Arrange
			const username = faker.random.alpha(10);
			const code = faker.datatype.number();
			const errorMessage = {
				message: faker.random.words(3)
			}

			const confirmRegistrationPromiseMock = jest.fn();
			bindMock.mockReturnValue(confirmRegistrationPromiseMock);
			confirmRegistrationPromiseMock.mockRejectedValue(errorMessage);

			//Assert
			await expect(verify(username, code)).rejects.toEqual(errorMessage);
			expect(adapterMock.getCognitoUser).toHaveBeenCalled();
			expect(confirmRegistrationPromiseMock).toHaveBeenCalledWith(code, true)
		})
	})
})