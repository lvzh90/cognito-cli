# Cognito Client
This client allows us to interact with any Cognito instances. We can register, verify, and login users given an user-pool

## What is Cognito?
`Cognito` is an AWS service that provides authentication, authorization, and user management for your web and mobile appication. Your users can `sign-up`, verify their accounts, and `sign-in` directly with a username and password, or through a third party such as Facebook, Amazon, Google or Apple.

The two main components of Amazon Cognito are user pools and identity pools. User pools are user directories that provide `sign-up` and `sign-in` options for your app users. Identity pools enable you to grant your users access to other AWS services. You can use identity pools and user pools separately or together.

The goal is to authenticate and authorize your user, so when the user `signs-in` through the application using the `Cognito` user pool if the authentication is succesfull the user will get a `JWT` toke` signed by Cognito.


## Getting Started
Install NodeJS 14.x LTS for your local machine. `NodeJS` will also install `npm`

### Install the npm dependencies for the project
```bash
npm install
```

### Run the test cases while you are developing
```bash
npm run tests
```

## Using the CLI
It is pretty important to bear on mind that before running the commands you will need to create a `.env` file in the root of the project with the following environment variables.

```bash
AWS_COGNITO_USER_POOL_ID=<user-pool-id>
AWS_COGNITO_CLIENT_ID=<cognito-client-id>
AWS_COGNITO_REGION=<region>
AWS_COGNITO_IDENTITY_POOL_ID=<identity-pool-id>
```
### Register an user
In order to create an user account in cognito there fields that are required such as the `username`, `email`, and `password`.
* The `username` should be an alphanumeric value
* The `password` parameter should contains an uppercase, lowercase and special characters.

```bash
npm run start -- signUp --username='<username>' --email='<email>' --password='<password>'
```

When the `sign-up` process is success you will get an especific object as you can see in the object below, and an email will be send to the registered email containing the verification code.
```json
{ username: 'username', userConfirmed: false }
```

### Verify user account
Once the account was created, you will get an email with the verification in the inbox of the email that was registered.
The verify command requires the following parameters.
* The `username` parameter should be the one that was used in the `sign-up`.
* The `verificationCode` parameter should be a number.

```bash
npm run start -- verify --username='<username>' --verificationCode='<code>'
```

When the verification process is success you will get a message as below.
```bash
SUCCESS
```

### Login an user
When users are validated in the `Cognito` user-pool, you can make use of them in order to get an access token, so to do this you can execute
the `sign-in` command using the following required commands.
* The username parameter should alphanumeric or you can also use the email address.
* The password parameter that was associated to the user when his account was created.

```bash
npm run start -- signIn --username='username or email' --password='password'
```

When the `sign-in` is success you will get an object with the token and also some additional information extracted from these tokens as you can see below.
 ```json
 {
	token: {
		accesToken: '',
		idToken: '',
		refreshToken: '',
	},
	email: '',
	exp: ,
	uid: '',
	auth_time: ,
	token_use: ''
}
```

Made with ❤️ by Linda Zapata H.
