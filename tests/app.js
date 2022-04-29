const app = require('../src/app');
const { cognito } = require('./utils/mocks') ;
const { faker } = require('@faker-js/faker');

describe('Cognito Services', () => {
	const { signUp, verify, signIn } = app(cognito);

	afterEach(() => {
		jest.clearAllMocks();
	})

	describe('SignUp', () => {
		it('GIVEN an username, email and password WHEN the function is called with a valid password THEN the function should create an user', async () => {
			//Arrange
			const username = faker.internet.userName();
			const email = faker.internet.email();
			const password = faker.internet.password();
			const userConfirmed = false;
			const signUpResponse = {
				username,
				userConfirmed,
			}

			cognito.signUp.mockResolvedValue(signUpResponse);

			//Act
			const response = await signUp(username, email, password);

			//Assert
			expect(cognito.signUp).toHaveBeenCalledWith(username, email, password);
			expect(response).toEqual(signUpResponse);
		})

		it('GIVEN an username, email and password WHEN the function failed in a unespected way THEN the function should throw an error', async () => {
			//Arrange
			const username = faker.internet.userName();
			const email = faker.internet.email();
			const password = faker.internet.password();
			const errorMessage = {
				message: faker.random.words(3)
			}

			cognito.signUp.mockRejectedValue(errorMessage);

			//Assert
			await expect(signUp(username, email, password)).rejects.toEqual(errorMessage);
			expect(cognito.signUp).toHaveBeenCalledWith(username, email, password);
		})
	})

	describe('Verify', () => {
		it('GIVEN an username and verification code WHEN the function is called with a valid code THEN the function should verify an user', async () => {
			//Arrange
			const username = faker.internet.userName();
			const code = faker.datatype.number();
			const verifyResponse = 'SUCCESS';

			cognito.verify.mockResolvedValue(verifyResponse);

			//Act
			const response = await verify(username, code);

			//Assert
			expect(cognito.verify).toHaveBeenCalledWith(username, code);
			expect(response).toEqual(verifyResponse);
		})

		it('GIVEN an username and verification code WHEN the function failed in a unespected way THEN the function should throw an error', async () => {
			//Arrange
			const username = faker.internet.userName();
			const code = faker.datatype.number();
			const errorMessage = {
				message: faker.random.words(3)
			}

			cognito.verify.mockRejectedValue(errorMessage);

			//Assert
			await expect(verify(username, code)).rejects.toEqual(errorMessage);
			expect(cognito.verify).toHaveBeenCalledWith(username, code);
		})
	})

	describe('SignIn', () => {
		it('GIVEN an username and password WHEN the function is called with a valid username and password THEN the function should login an user', async () => {
			//Arrange
			const username = faker.internet.userName();
			const password = faker.internet.password();
			const signInResponse = {
				token: {
					accessToken: faker.datatype.uuid(),
					idToken: faker.datatype.uuid(),
					refreshToken: faker.datatype.uuid(), 
				},
				email: faker.internet.email(),
				exp: faker.datatype.number(),
				uid: faker.datatype.uuid(),
				auth_time: faker.datatype.number(),
				token_use: faker.random.words(2)
			};

			cognito.signIn.mockResolvedValue(signInResponse);

			//Act
			const response = await signIn(username, password);

			//Assert
			expect(cognito.signIn).toHaveBeenCalledWith(username, password);
			expect(response).toEqual(signInResponse);
		})

		it('GIVEN an email and password WHEN the function is called with a valid email and password THEN the function should login an user', async () => {
			//Arrange
			const email = faker.internet.email();
			const password = faker.internet.password();
			const signInResponse = {
				token: {
					accessToken: faker.datatype.uuid(),
					idToken: faker.datatype.uuid(),
					refreshToken: faker.datatype.uuid(), 
				},
				email,
				exp: faker.datatype.number(),
				uid: faker.datatype.uuid(),
				auth_time: faker.datatype.number(),
				token_use: faker.random.words(2)
			};

			cognito.signIn.mockResolvedValue(signInResponse);

			//Act
			const response = await signIn(email, password);

			//Assert
			expect(cognito.signIn).toHaveBeenCalledWith(email, password);
			expect(response).toEqual(signInResponse);
		})

		it('GIVEN an username and password WHEN the function is called with a invalid username or password THEN the function should not login an user', async () => {
			//Arrange
			const username = faker.internet.userName();
			const password = faker.internet.password();
			const failureMessage = 'Incorrect username or password.'

			cognito.signIn.mockRejectedValue(failureMessage);

			//Assert
			await expect(signIn(username, password)).rejects.toEqual(failureMessage);
			expect(cognito.signIn).toHaveBeenCalledWith(username, password);
		})

		it('GIVEN an email and password WHEN the function is called with a invalid email THEN the function should not login an user', async () => {
			//Arrange
			const email = faker.internet.email();
			const password = faker.internet.password();
			const failureMessage = 'Incorrect username or password.'

			cognito.signIn.mockRejectedValue(failureMessage);

			//Assert
			await expect(signIn(email, password)).rejects.toEqual(failureMessage);
			expect(cognito.signIn).toHaveBeenCalledWith(email, password);
		})

		it('GIVEN an username and password WHEN the function failed in a unespected way THEN the function should throw an error', async () => {
			//Arrange
			const username = faker.internet.userName();
			const password = faker.internet.password();
			const errorMessage = {
				message: faker.random.words(3)
			}

			cognito.signIn.mockRejectedValue(errorMessage);

			//Assert
			await expect(signIn(username, password)).rejects.toEqual(errorMessage);
			expect(cognito.signIn).toHaveBeenCalledWith(username, password);
		})
	})

})