const error = {
  '403': 'Ce nom d\'utilisateur existe déjà',
  nameRequired: 'Donne un nom pour ce bateau',
  callsignUnique: 'Un bateau avec ce nom existe déjà',
  eniUnique: 'Un bateau avec le numéro ENI existe déjà',
  imoUnique: 'Un bateau avec le numéro IMO existe déjà',
  mmsiUnique: 'Un bateau avec le numéro MMSI existe déjà',
  missingField: 'Tous les champs doivent être remplis',
  incorrectPassword: 'Ce mot de passe semble incorrect',
  noAccountFound: 'Aucun compte avec ce nom d\'utilisateur ou cet e-mail n\'a pu être trouvé',
  multipleAccountsFound: 'Il y a plusieurs comptes avec cet e-mail. Utilise ton nom d\'utilisateur',
  passwordsDoNotMatch: 'Le mot de passe ne correspond pas',
  passwordTooShort: 'Le mot de passe doit avoir au moins 8 caractères'
}

export default error
