'use strict';

module.exports = (cognito) => ({
    signUp: async (username, email, password) => cognito.signUp(username, email, password),
    verify: async (username, verificationCode) => cognito.verify(username, verificationCode),
    signIn: async (username, password) => cognito.signIn(username, password)
})
