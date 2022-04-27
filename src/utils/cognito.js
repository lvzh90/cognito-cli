const AWSConfig = require('./config');

function signUp(username, email, password) {
  return new Promise((resolve, reject) => {
    AWSConfig.initAWS();
    AWSConfig.setCognitoAttributeList(email);

    AWSConfig.getUserPool().signUp(username, password, AWSConfig.getCognitoAttributeList(), null, function(err, result) {
      if (err) {
        console.log('error: ', err)
        return reject({ statusCode: 422, response: err });
      }
      const response = {
        username: result.user.username,
        userConfirmed: result.userConfirmed,
        userAttributes: result.user,
      }
        return resolve({ statusCode: 201, response: response });
      });
    });
}

function verify(username, code) {
  return new Promise((resolve, reject) => {
    AWSConfig.getCognitoUser(username).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return reject({ statusCode: 422, response: err });
      }
      return resolve({ statusCode: 200, response: result });
    });
  });
}

function signIn(username, password) {
  return new Promise((resolve, reject) => {
    AWSConfig.getCognitoUser(username).authenticateUser(AWSConfig.getAuthDetails(username, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }  
        return resolve({ statusCode: 200, response: AWSConfig.decodeJWTToken(token) });
      },
      
      onFailure: (err) => {
        return reject({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

module.exports = {
    signUp,
    verify,
    signIn
}