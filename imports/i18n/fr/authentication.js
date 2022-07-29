const authentication = {
  landing: {
    title: 'Welcome to JW Management',
  },
  signIn: {
    name: 'Se connecter',
    text: 'Donne les informations de ton compte pour te connecter.',
    forgot: 'Nom d\'utilisateur ou mot de passe oublié ?',
    create: 'Créer un compte'
  },
  forgotPassword: {
    name: 'Identifiant ou mot de passe oublié',
    text: 'Donne ton adresse e-mail. Nous t\' enverrons ensuite un lien pour modifier ton mot de passe. Tu seras automatiquement connecté sur ton compte et tu pourra consulter ton profile.',
    button: 'Envoyer le lien de modification du mot de passe',
    back: 'Retour sur la page de connexion',
    noUserForThisEmail: 'Aucun compte ne possède cette adresse e-mail',
    multipleAccountsForThisEmail: 'Il y a plusieurs comptes avec cette adresse e-mail. Veuille spécifier le nom d’utilisateur.',
    emailMissing: 'Il manque l’adresse e-mail',
    mailSent: 'Tu vas recevoir un e-mail ou tu cliqueras sur le lien pour modifier ton mot de passe.'
  },
  resetPassword: {
    name: 'Modifie ton mot de passe',
    text: 'Veuille rentrer un nouveau mot de passe pour {{0}} {{1}}.',
    noUserFound: '<p>Ce lien n’est plus valide.</p><p>Demande un nouvel e-mail de modification de mot de passe.</p>',
    button: 'Modifie ton mot de passe',
    back: 'Retour sur la page de connexion'
  },
  firstLogin: {
    name: 'Bienvenue',
    text: '<p>Nous avons hâtes de t\'accueillir!</p><p>Choisi ton nom d\'utilisateur et ton mot de passe. Tu en auras besoin pour te connecter au système.</p><p>Après cela, tu pourras commencer à utiliser JW Management</p><p>Amuse toi bien!</p>',
    agreeTerms: 'J’accepte les <a href="/en/terms" target="blank">conditions d’utilisation</a> et la <a href="/de/privacy" target="blank">politique de confidentialité</a>',
    button: 'C’est parti!',
    tokenError: 'Ce lien n’est plus valide. Demande un nouvel e-mail ou essaye de modifier ton mot de passe.',
    tokenMissing: 'Lien invalide. Veuille cliquer sur le lien de l’e-mail.',
    usernameExists: 'Ce nom d\'utilisateur est déjà utilisé. Choisis en un autre.',
    usernameMissing: 'Choisis un nom d\'utilisateur.',
    agreeTermsMissing: 'Veuille accepter les conditions d\'utilisation et la politique de confidentialité..',
    buttonCreateAccount: 'J’ai besoin de créer un nouveau compte',
    buttonHaveAccount: 'J’ai déjà un compte'
  }
}

export default authentication
