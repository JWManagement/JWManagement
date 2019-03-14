const authentication = {
  signIn: {
    name: 'Sign In',
    text: 'Please enter your account details to sign in',
    forgot: 'I forgot username or password',
    create: 'I don\'t have an account'
  },
  signUp: {
    name: 'Sign Up',
    text: '<p>You want to test the system and manage your own project?<p></p>Just enter your details below to create an account.</p>',
    bySigningYouAgreeTo: 'By signing up, you agree to our',
    terms: 'terms of usage',
    andOur: 'and our',
    privacyPolicy: 'privacy policy',
    signIn: 'I already have an account'
  },
  forgotPassword: {
    name: 'Forgotten username or password',
    text: 'Please enter your email address. We will send you a link to reset your password, then. You\'ll automatically be logged in and can then look up your username.',
    button: 'Send password reset link',
    back: 'Back to sign in',
    noUserForThisEmail: 'There is no account with this email address',
    multipleAccountsForThisEmail: 'There are multiple accounts with this email. Please specify a user.',
    emailMissing: 'Email address is missing',
    mailSent: 'You will receive an email shortly. Follow the link in the email to reset your password.'
  },
  resetPassword: {
    name: 'Reset password',
    text: 'Please enter a new password for {{0}}.',
    noUserFound: '<p>This link is invalid.</p><p>Please request another reset password mail.</p>',
    button: 'Change password',
    back: 'Back to sign in'
  },
  firstLogin: {
    name: 'Welcome',
    text: '<p>We are looking forward to welcoming you.</p><p>Please set your personal username and password. From now on you will need these to authenticate on the system.</p><p>After that you can start using JW Management.</p><p>Enjoy!</p>',
    agreeTerms: 'I agree the <a href="/en/terms" target="blank">terms of usage</a> and the <a href="/de/privacy" target="blank">privacy policy</a>',
    button: 'Let\'s Go!',
    tokenError: 'Expired link. This is not valid any more. Please ask for a new E-Mail or try to reset your password.',
    plainTextToken: 'Seems like you\'re mail client doesn\'t support html mails. Please open the mail with a modern mail client to get the full link.',
    tokenMissing: 'Invalid link. Please visit the link from the email.',
    usernameExists: 'This username is already in use. Please choose another one.',
    usernameMissing: 'Please provide a username.',
    usernameCannotBeEmail: 'Sorry, the username cannot be an email address. Please choose a different username.',
    agreeTermsMissing: 'Please agree the terms of usage and the privacy policy.',
    buttonCreateAccount: 'I need to create an account',
    buttonHaveAccount: 'I already have an account'
  }
}

export default authentication
