const error = {
  generic: 'Sorry, an error occurred. Please try again.',
  '403': 'This username already exists',
  nameRequired: 'Please enter the name of this vessel',
  callsignUnique: 'A vessel with this call sign already exists',
  eniUnique: 'A vessel with this ENI number already exists',
  imoUnique: 'A vessel with this IMO number already exists',
  mmsiUnique: 'A vessel with this MMSI number already exists',
  missingField: 'Please fill out all fields',
  incorrectPassword: 'This password seems to be incorrect',
  noAccountFound: 'No account with this username or email could be found',
  multipleAccountsFound: 'There are multiple accounts with this email. Please use the username',
  passwordsDoNotMatch: 'The passwords do not match',
  passwordTooShort: 'The password must have at least 8 characters'
}

export default error
