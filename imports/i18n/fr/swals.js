const swal = {
  error: 'Erreur',
  publisherInOtherTeam: 'Un proclamateur sélectionné est déjà inscrit dans une autre équipe. Commence d\'abord par l\'enlever de cette équipe.',
  onlyTeam: 'Tu ne peux pas supprimer cette équipe, qui est la seule pour cette plage horaire. Chaque plage horaire doit comporter au moins une équipe.',
  noTeamleader: 'Chaque équipe a besoin d\'un responsable d\'équipe. Cependant ce proclamateur n\'a pas l\'autorisation de servir comme responsable d\'équipe.',
  ownPermission: 'Tu n\'as pas l\'autorisation de modifier tes propres autorisations. Prend contact avec le responsable du projet.',
  approvalInformed: 'Ce proclamateur a été informé que sa demande a été approuvée.',
  declinementInformed: 'Ce proclamateur a été informé que sa demande a été annulée.',
  vacationEndInPast: 'La date de fin ne peut pas se trouver dans le passé.',
  missingTag: 'Pas d\'étiquette définie. Veuille d\'abord définir une étiquette sous : Admin > Paramètres',
  logout: {
    title: 'Suggestion',
    text: 'Il n\'est pas nécessaire de se déconnecter, sauf si tu te trouves sur un ordinateur partagé ou public. La connection est chiffrée et seulement les informations de la session courante se trouvent dans ton navigateur local. Personne d\'autre ne peut voir ou détourner les informations de ta session.',
    confirm: 'Se déconnecter',
    cancel: 'Annuler'
  },
  invite: {
    user: {
      title: 'Invite ce proclamateur?',
      text: 'Ce proclamateur <b>a déjà un compte</b>, Il n\'a pas besoin d\'en créer un autre. Le proclamateur sera <b> ajouté pour ce projet</b>.<br>Bien évidemment <b>nous l\'informerons</b> concernant cette modification. <br><p>Si une même adresse e-mail est utilisée pour l\'enregistrement de plusieurs proclamateurs, choisis l\'option adéquate:</p>'
    },
    users: {
      title: 'Es-tu certain?',
      text: 'Nous enverrons un e-mail à tous les proclamateurs sélectionnés.',
      confirm: 'Inviter',
      cancel: 'Annuler'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Es-tu certain?',
      text: 'Tous les proclamateurs approuvés dans l\'équipe recevront un e-mail de confirmation et les autres un e-mail d\'annulation.',
      confirm: 'Oui',
      cancel: 'Annuler'
    },
    confirmation: {
      title: 'Informer les proclamateurs?',
      text: 'Les proclamateurs seront informés par e-mail que leur inscription a été acceptée.',
      confirm: 'Oui',
      cancel: 'Annuler'
    },
    declined: {
      title: 'Informer les proclamateurs?',
      text: 'Les proclamateurs seront informés par e-mail que leur inscription a été annulée.',
      confirm: 'Oui',
      cancel: 'Annuler'
    },
    selectTag: {
      title: 'Quelle étiquette?',
      text: 'Sélectionne l\'étiquette souhaitée pour l\'envoi de confirmations par e-mail:',
      confirm: 'OK',
      cancel: 'Annuler'
    },
    teamUpdate: {
      user: {
        title: 'Le responsable d\'équipe est déjà informé',
        text: 'Le Responsable d\'équipe est déjà informé. Souahites-tu lui envoyer les modifications de cette équipe par e-mail?',
        confirm: 'Oui',
        cancel: 'Non'
      },
      general: {
        title: 'Es-tu certain?',
        text: 'Les proclamateurs qui ont déjà été informés recevront un e-mail avec les modifications de cette équipe.',
        confirm: 'Oui',
        cancel: 'Non'
      }
    },
    understaffed: {
      title: 'Informer les proclamateurs?',
      text: 'Informer tous les proclamateurs que cette équipe est en sous-effectif ?',
      confirm: 'Oui',
      cancel: 'Non',
      teamleader: {
        title: 'Informer le responsables d\'équipe ?',
        text: 'Informer tous les responsables d\'équipe à propos de cette équipe?',
        confirm: 'Oui',
        cancel: 'Non'
      }
    }
  },
  add: {
    meeting: {
      title: 'Ajouter un nouveau point de rendez-vous',
      text: '',
      placeholder: 'Nom',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    },
    question: {
      title: 'Ajouter une nouvelle question ou ajouter un titre',
      text: '',
      placeholder: 'Question/Titre',
      inputError: 'Tu dois écrire quelque chose!',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    },
    tab: {
      title: 'Ajouter un nouvel onglet',
      text: '',
      placeholder: 'Titre',
      inputError: 'Nom d\'onglet invalide!',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    },
    tag: {
      title: 'Ajouter une nouvelle étiquette',
      text: '',
      placeholder: 'Nom',
      inputError: 'Nom d\'étiquette invalide!',
      confirm: 'Créer',
      cancel: 'Annuler'
    },
    team: {
      title: 'Ajouter une nouvelle équipe',
      text: '',
      placeholder: 'Nom',
      inputError: 'Nom d\'équipe invalide!',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    },
    template: {
      title: 'Ajouter un modèle',
      text: '',
      placeholder: 'Nom',
      inputError: 'Nom de modèle invalide!',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    },
    user: {
      title: 'Créer!',
      text: 'L\'utilisateur a été créé.'
    },
    users: {
      title: 'Es-tu certain?',
      text: 'Tous les proclamateurs qui sont affichés seront ajoutés au projet.',
      confirm: 'Ajouter',
      cancel: 'Annuler'
    }
  },
  update: {
    file: {
      title: 'Modifier le nom de fichier',
      text: '',
      placeholder: 'Nom de fichier',
      inputError: 'Nom de fichier invalide!',
      confirm: 'Modifier',
      cancel: 'Annuler'
    },
    password: {
      title: 'Modifier le mot de passe',
      passwordOld: 'Précédent mot de passe',
      passwordNew1: 'Nouveau mot de passe',
      passwordNew2: 'Répéter le nouveau nouveau mot de passe',
      confirm: 'Modifier',
      cancel: 'Annuler',
      passwordChanged: 'Mot de passe modifié'
    },
    question: {
      title: 'Modifier la question',
      text: '',
      placeholder: 'Question/Titre',
      confirm: 'Modifier',
      cancel: 'Annuler'
    },
    template: {
      title: 'Modifier le nom',
      text: '',
      placeholder: 'Nom',
      confirm: 'Modifier',
      cancel: 'Annuler'
    }
  },
  delete: {
    account: {
      title: 'Veux-tu vraiment supprimer ton compte?',
      text: 'Cette action supprimera de manière définitive le compte!',
      confirm: 'Supprimer mon compte!',
      cancel: 'Annuler'
    },
    allShifts: {
      title: 'Es-tu certain?',
      text: 'Cette action supprimera de manière définitive toutes les plages horaires de cette journée et toutes les demandes pour ces plages horaires.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    file: {
      title: 'Es-tu certain?',
      text: 'Cette action supprimera de manière définitive le fichier.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    language: {
      title: 'Veux-tu vraiment supprimer cette langue?',
      text: 'Cette action supprimera de manière définitive cette langue avec son stock.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    meeting: {
      title: 'Veux-tu vraiment supprimer ce point de rencontre?',
      text: 'Le point de rencontre sera aussi enlevé de toutes les plages horaires existantes dans le futur.',
      checkInput: 'Supprimer',
      placeholder: 'Merci de saisir "{{0}}" pour confirmer la suppression',
      inputError: 'L\'entrée saisie ne correspond pas avec "{{0}}"',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    note: {
      title: 'Veux-tu vraiment supprimer cette note?',
      text: 'Cette action supprimera de manière définitive la note.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    project: {
      title: 'Veux-tu vraiment supprimer ce projet?',
      text: 'Cette action supprimera de manière définitive toutes les configurations associées à ce projet, par ex. plages horaires, rapport, demande, publications, etc. Seul les comptes utilisateurs seront maintenus.',
      checkInput: 'Supprimer ce projet',
      placeholder: 'Merci de saisir "{{0}}" pour confirmer la suppression',
      inputError: 'L\'entrée saisie ne correspond pas avec "{{0}}"',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    publication: {
      title: 'Supprime cette publication de ton stock?',
      text: 'Tu perdras toutes les données enregistrées pour cette publication.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    question: {
      title: 'Es-tu certain?',
      text: 'Cette action supprimera de manière définitive la question et ses réponses.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    shift: {
      title: 'Veux-tu vraiment supprimer cet horaire?',
      text: 'Toutes les demandes pour cet horaire seront annulées.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    store: {
      title: 'Veux-tu vraiment mettre le stock à zéro ?',
      text: 'Cette action supprimera de manière définitive toutes les publications ajoutées.',
      confirm: 'Mettre à zéro',
      cancel: 'Annuler'
    },
    tab: {
      title: 'Es-tu certain?',
      text: 'Cette action supprimera de manière définitive l\'onglet en entier incluant toutes les questions.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    tag: {
      title: 'Veux-tu vraiment supprimer l\'étiquette?',
      text: 'Cette action supprimera de manière définitive tous les horaires appartenant à cette étiquette, incluant toutes les inscriptions concernant cet horaire. <br><br> Saisir "{{0}}" pour confirmer.',
      checkInput: 'Supprimer',
      placeholder: 'Merci de saisir "{{0}}" pour confirmer',
      inputError: 'L\'entrée saisie ne correspond pas avec "{{0}}"',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    team: {
      title: 'Veux-tu vraiment supprimer cette équipe?',
      text: 'L\'équipe sera supprimée de tous les horaires existants et planifiées dans le futur. Les inscriptions approuvées pour cet horaire seront replacés dans d\'autres équipes. <br><br> Saisir "{{0}}" pour confirmer.',
      checkInput: 'Supprimer',
      placeholder: 'Merci de saisir "{{0}}" pour confirmer',
      inputError: 'L\'entrée saisie ne correspond pas avec "{{0}}"',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    template: {
      title: 'Veux-tu vraiment supprimer le modèle?',
      text: '',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    },
    user: {
      title: 'Veux-tu vraiment supprimer cet utilisateur?',
      text: 'Toutes les droits du projet seront révoqués.',
      confirm: 'Supprimer',
      cancel: 'Annuler'
    }
  },
  request: {
    approve: {
      title: 'Veux-tu vraiment approuver le proclamateur?',
      text: 'L\'inscription de ce proclamateur avait été précédemment annulée. Merci de s\'assurer que ce proclamateur puisse à nouveau participer au projet.',
      confirm: 'Oui',
      cancel: 'Non'
    },
    cancel: {
      title: 'Es-tu certain?',
      text: 'L\'équipe sera supprimée si tu es le dernier participant.',
      confirm: 'Oui, annulle ma participation',
      cancel: 'Non'
    },
    decline: {
      title: 'Veux-tu vraiment annuler le proclamateur ?',
      text: 'Si le proclamateur avait reçu une confirmation, il recevra par e-mail que son inscription a été annulée.',
      confirm: 'Oui',
      cancel: 'Non'
    },
    maxReached: {
      title: 'Trop de proclamateurs sont sélectionnés',
      text: 'Configure le nombre maximum pour l\'équipe, de {{0}} à {{1}} et approuve ceux qui sont sélectionnés?',
      confirm: 'Approuve ceux qui sont sélectionnés',
      cancel: 'Annuler'
    },
    minNotReached: {
      title: 'Nombre insuffisant de proclamateurs sélectionnés',
      text: 'Configure le nombre minimum pour l\'équipe, de {{0}} to {{1}} et approuve ceux qui sont  sélectionnés?',
      confirm: 'Approuve ceux qui sont sélectionnés',
      cancel: 'Annuler'
    },
    minReached: {
      title: 'Veux-tu vraiment supprier le proclamateur ?',
      text: 'Cette équipe a atteint le nombre minimal de proclamateur. Si tu supprimes ce proclamateur, le système supprimera cette équipe.',
      confirm: 'Supprimer l\'équipe',
      cancel: 'Non'
    },
    noNewTeamleader: {
      title: 'Veux-tu vraiment supprimer ce proclamateur ?',
      text: 'Il n\'y a pas d\'autres responsables d\'équipe pour cette équipe. Si tu supprimes ce proclamateur, le système supprimera cette équipe.',
      confirm: 'Supprimer l\'équipe',
      cancel: 'Non'
    }
  }
}

export default swal
