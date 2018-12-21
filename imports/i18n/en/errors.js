const error = {
  '403': 'This username already exists',
  nameRequired: 'Please enter the name of this vessel',
  callsignUnique: 'A vessel with this call sign is already existing',
  eniUnique: 'A vessel with this ENI number is already existing',
  imoUnique: 'A vessel with this IMO number is already existing',
  mmsiUnique: 'A vessel with this MMSI number is already existing',
  missingField: 'Please fill out all fields',
  incorrectPassword: 'This password seems to be incorrect',
  noAccountFound: 'No account with this username or email could be found',
  multipleAccountsFound: 'There are multiple accounts with this email. Please use the username',
  passwordsDoNotMatch: 'The passwords do not match',
  passwordTooShort: 'The password has to have at least 8 characters'
}

export default error
