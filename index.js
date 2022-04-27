const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { signUp, verify, signIn } = require('./app')

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
(argv) => {
    signUp(argv.username, argv.email, argv.password)
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
(argv) => {
    verify(argv.username, argv.verificationCode)
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
(argv) => {
    signIn(argv.username, argv.password)
})
.parse()
