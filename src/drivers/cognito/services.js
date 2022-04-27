'use strict';

module.exports = (adapter) => ({
	signUp: (username, email, password) => {
		return new Promise((resolve, reject) => {
			adapter.initAWS();
			adapter.setCognitoAttributeList(email);
		
			adapter.getUserPool().signUp(username, password, adapter.getCognitoAttributeList(), null, function(err, result) {
			  if (err) {
				console.error('[cognito:SingUp]: Something went wrong registering the user', err.message)
				return reject(err);
			  }
			  const response = {
				username: result.user.username,
				userConfirmed: result.userConfirmed,
				userAttributes: result.user,
			  }
				return resolve(response);
			  });
			});
	},

	verify: (username, code) => {
		return new Promise((resolve, reject) => {
			adapter.getCognitoUser(username).confirmRegistration(code, true, (err, result) => {
			  if (err) {
				console.error('[cognito:Verify]: Something went wrong verifying the user', err.message)
				return reject(err);
			  }
			  return resolve(result);
			});
		  });
	},

	signIn: (username, password) => {
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
