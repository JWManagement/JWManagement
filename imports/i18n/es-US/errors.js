const error = {
  generic: 'Lo sentimos, ocurrió un error, Por favor trata de nuevo.',
  '403': 'Este nombre de usuario ya existe',
  nameRequired: 'Por favor entre el nombre de este barco',
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
