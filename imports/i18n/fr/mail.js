const mail = {
  footer: 'Ceci est un e-mail automatique. Il n’est pas nécessaire d’y répondre.',
  link: 'Ouvrir JW Management',
  accountCreated: {
    subject: 'Compte JW Management créé!',
    headline: 'Bienvenue!',
    hello: 'Bonjour',
    text1: 'Nous t\'informons que nous t\'avons créé un compte dans JW Management. Tu peux choisir ton nom d\'utilisateur et ton mot de passe en cliquant sur le bouton ci-dessous.',
    text2: 'En cas de problème, n’hésite pas à nous contacter.<br>Nous te souhaitons bien du plaisir dans l\'utilisation de JW Management.<br> Vos frères de JW Management.',
    button: 'C\'est parti!'
  },
  teamCancellation: {
    subject: 'Équipe supprimée.',
    headline: 'L’équipe a été supprimée.',
    hello: 'Bonjour',
    text: 'Malheureusement, nous devons t\'informer que ta demande <b>{{date}}</b> pour le <b>{{time}}</b> a été <u>annulée</u>.',
    missingParticipant: 'Il manque des participants. S’il y a suffisamment de participants, l’équipe peut être réactivée.'
  },
  confirmation: {
    subject: 'Nouvelle inscription acceptée',
    headline: 'ton inscription a été acceptée !',
    hello: 'Bonjour',
    text1: 'ton inscription concernant l’horaire suivant a été acceptée :',
    datetime: '{{date}} à partir de {{time}} heure'
  },
  declined: {
    subject: 'Inscription annulée.',
    headline: 'ton inscription a été annulée.',
    hello: 'Bonjour',
    text1: 'Malheureusement, ton inscription concernant l’horaire suivant a été annulée:',
    text2: 'Merci beaucoup pour ton inscription !',
    datetime: '{{date}} à partir de {{time}} heures'
  },
  reversal: {
    subject: 'Modifications',
    hello: 'Bonjour',
    text1: 'Tu as été retiré de l’équipe ci-dessous :',
    datetime: '{{date}} à partir de {{time}} heures'
  },
  teamUpdate: {
    subject: 'Changement d’équipe',
    _changed: 'Modifié.',
    changed: {
      participant: 'Un participant',
      time: 'La durée',
      location: 'Le lieux',
      leader: 'Le responsable d\'équipe'
    },
    hello: 'Bonjour',
    text1: 'Tu es désigné comme participant ou responsable d’équipe, c’est pour cela que nous t\'informons de certains changements dans ton équipe.',
    text2: 'Voici la formation actuel de ton équipe',
    datetime: '{{date}} à partir de {{time}} heures'
  },
  understaffed: {
    subject: 'Équipe en sous-effectif',
    headline: 'L’équipe n’a pas assez de proclmateurs',
    hello: 'Bonjour',
    text1: 'L’équipe ci-dessous est en sous-effectif et a besoin d’un',
    text2: 'Aurais-tu la possibilité d’aider cette équipe ?',
    datetime: '{{date}} à partir de {{time}} heures'
  },
  resetPassword: {
    subject: 'Modification du mot de passe',
    headline: 'Modifier ton mot de passe',
    text1: 'Bonjour,<br>pour modifier ton mot de passe, clique sur le lien ci-dessous :',
    button: 'Modifier le mot de passe',
    text2: '<p>Des conseils utiles pour choisir un mot de passe sécurisé peuvent être trouvés sur <a href="http://wol.jw.org/en/wol/d/r1/lp-e/102001451">g01 6/22 p. 31</a></p><p>Si tu n\'a pas fait de demande de modification de mot de passe, tu peux supprimer cet E-mail.</p>'
  }
}

export default mail
