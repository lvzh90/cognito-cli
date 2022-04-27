'use strict';
require('dotenv').config();

const Cognito = require('./src/utils/cognito');

async function signUp(username, email, password) {
    const response = await Cognito.signUp(username, email, password);
    console.log(response);
}

async function verify(username, verificationCode) {
    const response = await Cognito.verify(username, verificationCode);
    console.log(response);
}

async function signIn(username, password) {
    const response = await Cognito.signIn(username, password);
    console.log(response);
}

module.exports = { signUp, verify, signIn }