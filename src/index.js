'use strict';

require('dotenv').config();

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const cognito = require('./drivers/cognito');
const app = require('./app')

const  { signUp, verify, signIn } = app(cognito);

yargs(hideBin(process.argv))
.command('signUp', 'SignUp a user',
(yargs) => {
    yargs.option('username', {
        describe: 'User mame',
        demandOption: true,
        type: 'string'
    })
    yargs.option('email', {
        describe: 'Email',
        demandOption: true,
        type: 'string'
    })
	yargs.option('password', {
        describe: 'Password',
        demandOption: true,
        type: 'string'
    })
},
async (argv) => {
   const response = await signUp(argv.username, argv.email, argv.password);
   console.log(response);
})
.parse()

yargs(hideBin(process.argv))
.command('verify', 'Verify a user registration',
(yargs) => {
    yargs.option('username', {
        describe: 'User name',
        demandOption: true,
        type: 'string'
    })
	yargs.option('verificationCode', {
        describe: 'Verification code',
        demandOption: true,
        type: 'string'
    })
},
async (argv) => {
    const response = await verify(argv.username, argv.verificationCode);
    console.log(response);
})
.parse()

yargs(hideBin(process.argv))
.command('signIn', 'SignIn a user',
(yargs) => {
    yargs.option('username', {
        describe: 'It is possible to set username or email',
        demandOption: true,
        type: 'string'
    })
	yargs.option('password', {
        describe: 'Password',
        demandOption: true,
        type: 'string'
    })
},
async (argv) => {
    const response = await signIn(argv.username, argv.password);
    console.log(response);
})
.parse()
