'use strict';


module.exports = (promisify, adapter) => ({
	signUp: async (username, email, password) => {
	
		adapter.initAWS();
		adapter.setCognitoAttributeList(email);
		const userPool = adapter.getUserPool();
		const signUpPromise = promisify(userPool.signUp).bind(userPool);

		try {

			const result = await signUpPromise(username, password, adapter.getCognitoAttributeList(), null);

			const response = {
				username: result.user.username,
				userConfirmed: result.userConfirmed,
			}

			return response;

		} catch (err) {
			console.log('[Cognito:SignUp]: Something went wrong registering the user', err.message)
			throw err;
		}
	},

	verify: async (username, code) => {

		const cognitoUser = adapter.getCognitoUser(username);
		const confirmRegistrationPromise = promisify(cognitoUser.confirmRegistration).bind(cognitoUser);

		try {

			const result = await confirmRegistrationPromise(code, true);
			return result;

		} catch (err) {
			console.log('[Cognito:Verify]: Something went wrong validating the account of the user', err.message);
			throw err;	
		}
	},

	/* istanbul ignore next */
	signIn: async (username, password) => {
		return new Promise((resolve, reject) => {
			adapter.getCognitoUser(username).authenticateUser(adapter.getAuthDetails(username, password), {
				onSuccess: (result) => {
					const token = {
					accessToken: result.getAccessToken().getJwtToken(),
					idToken: result.getIdToken().getJwtToken(),
					refreshToken: result.getRefreshToken().getToken(),
					}  
					return resolve(adapter.decodeJWTToken(token));
				},
				
				onFailure: (err) => {
					return reject(err.message || JSON.stringify(err));
				},
			});
		});
	}
})
