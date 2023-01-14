const swal = {
  error: 'Erro',
  publisherInOtherTeam: 'Um dos publicadores seleccionados já faz parte de outra equipa. Por favor, remova-o de lá primeiro.',
  onlyTeam: 'Não se pode apagar esta equipa. É a única equipa neste turno. Cada turno precisa de ter pelo menos uma equipa.',
  noTeamleader: 'Cada equipa necessita de um dirigente de equipa. Infelizmente, este publicador não tem permissão para ser dirigente de equipa.',
  ownPermission: 'Não está autorizado a remover as suas próprias permissões. Outro administrador tem de o fazer.',
  approvalInformed: 'Este participante foi informado de que o seu pedido foi aprovado.',
  declinementInformed: 'Este participante foi informado de que o seu pedido foi recusado.',
  vacationEndInPast: 'A data do fim não pode ser no passado.',
  missingTag: 'Nenhuma etiqueta definida. Por favor, defina primeiro uma etiqueta em Admin > Definições',
  logout: {
    title: 'Dica',
    text: 'Não é necessário terminar a sessão, a menos que esteja num computador partilhado. A connexão é encriptada a informação da sessão está apenas guardada no seu navegador local. Ninguém mais pode ver ou sequestrar a sua sessão.',
    confirm: 'Sair',
    cancel: 'Cancelar'
  },
  invite: {
    user: {
      title: 'Convidar publicador?',
      text: 'Este publicador <b>já tem uma conta</b>, por isso não é necessário criar mais uma. Em vez disso o publicador vai <b>simplesmente receber a permissão para aceder a este projeto</b>.<br>Claro que <b>iremos informá-lo</b> sobre esta mudança. <br><p>Caso vários publicadores se tenham inscrito com o mesmo endereço email, escolha a opção correta:</p>'
    },
    users: {
      title: 'Tem a certeza?',
      text: 'Vamos enviar um email a todos os publicadores seleccionados.',
      confirm: 'Convidar',
      cancel: 'Cancelar'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Tem a certeza?',
      text: 'Todos os publicadores aprovados receberão um email de confirmação e todos os publicadores recusados receberão um email de rejeição.',
      confirm: 'Sim',
      cancel: 'Cancelar'
    },
    confirmation: {
      title: 'Informar publicadores?',
      text: 'Os publicadores serão informados por email sobre a aprovação.',
      confirm: 'Sim',
      cancel: 'Cancelar'
    },
    declined: {
      title: 'Informar publicadores?',
      text: 'Os publicadores serão informados por email sobre a rejeição.',
      confirm: 'Sim',
      cancel: 'Cancelar'
    },
    selectTag: {
      title: 'Qual etiqueta?',
      text: 'Por favor seleccione a etiqueta para a qual gostaria de enviar emails de confirmação:',
      confirm: 'OK',
      cancel: 'Cancelar'
    },
    teamUpdate: {
      user: {
        title: 'Dirigente de equipa já está informado',
        text: 'O dirigente de equipa já foi indormado. Deseja enviar-lhe um e-mail com esta actualização?',
        confirm: 'Sim',
        cancel: 'Não'
      },
      general: {
        title: 'Tem a certeza?',
        text: 'Publicadores já informados receberão um e-mail com a informação actualizada sobre a equipa.',
        confirm: 'Sim',
        cancel: 'Não'
      }
    },
    understaffed: {
      title: 'Informar publicadores?',
      text: 'Informar todos os publicadores sobre a falta de pessoal nesta equipa?',
      confirm: 'Sim',
      cancel: 'Não',
      teamleader: {
        title: 'Informar dirigentes de equipa?',
        text: 'Informar todos os dirigentes de equipa sobre esta equipa?',
        confirm: 'Sim',
        cancel: 'Não'
      }
    }
  },
  add: {
    meeting: {
      title: 'Adicionar novo ponto de encontro',
      text: '',
      placeholder: 'Nome',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    },
    question: {
      title: 'Adicionar uma nova pergunta/título',
      text: '',
      placeholder: 'Pergunta/Título',
      inputError: 'Tem de escrever algo!',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    },
    tab: {
      title: 'Adicionar um novo separador',
      text: '',
      placeholder: 'Título',
      inputError: 'Nome de separador inválido!',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    },
    tag: {
      title: 'Adicionar nova etiqueta',
      text: '',
      placeholder: 'Nome',
      inputError: 'Nome de etiqueta inválido!',
      confirm: 'Criar',
      cancel: 'Cancelar'
    },
    team: {
      title: 'Adicionar nova equipa',
      text: '',
      placeholder: 'Nome',
      inputError: 'Nome de equipa inválido!',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Adicionar modelo',
      text: '',
      placeholder: 'Name',
      inputError: 'Nome de modelo inválido!',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    },
    user: {
      title: 'Criado!',
      text: 'O utilizador foi criado.'
    },
    users: {
      title: 'Tem a certeza?',
      text: 'Todos os publicadores mostrados serão adicionados ao projeto.',
      confirm: 'Adicionar',
      cancel: 'Cancelar'
    }
  },
  update: {
    file: {
      title: 'Mudar nome de ficheiro',
      text: '',
      placeholder: 'Nome de ficheiro',
      inputError: 'Nome de ficheiro inválido!',
      confirm: 'Mudar',
      cancel: 'Cancelar'
    },
    password: {
      title: 'Mudar palavra-passe',
      passwordOld: 'Palavra-passe antiga',
      passwordNew1: 'Nova palavra-passe',
      passwordNew2: 'Repetir nova palavra-passe',
      confirm: 'Mudar',
      cancel: 'Cancelar',
      passwordChanged: 'Palavra-passe mudada'
    },
    question: {
      title: 'Mudar pergunta',
      text: '',
      placeholder: 'Pergunta/Título',
      confirm: 'Mudar',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Edit nome',
      text: '',
      placeholder: 'Nome',
      confirm: 'Mudar',
      cancel: 'Cancelar'
    }
  },
  delete: {
    account: {
      title: 'Quer mesmo apagar a sua conta?',
      text: 'A conta será irreversivelmente apagada!',
      confirm: 'Apagar a minha conta!',
      cancel: 'Cancelar'
    },
    allShifts: {
      title: 'Tem a certeza?',
      text: 'Todos os turnos neste dia e todos os pedidos para estes turnos serão irreversivelmente apagados.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    file: {
      title: 'Tem a certeza?',
      text: 'O ficheiro será apagado permanentemente.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    language: {
      title: 'Quer mesmo apagar esta língua?',
      text: 'Isto irá apagar a língua junto com o estoque.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    meeting: {
      title: 'Quer mesmo apagar este ponto de encontro?',
      text: 'Este ponto de encontro será apagado junto com todos os seus turnos planeados para o futuro.',
      checkInput: 'apagar',
      placeholder: 'Por favor escreva "{{0}}" para aprovar',
      inputError: 'O que escreveu não coincide com "{{0}}"',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    note: {
      title: 'Quer mesmo apagar esta nota?',
      text: 'A nota será apagada permanentemente.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    project: {
      title: 'Quer mesmo apagar este projeto?',
      text: 'Isto irá apagar irreversivelmente todas as definições associadas a este projecto (por exemplo, turnos, relatórios, pedidos, literatura). Apenas as contas de utilizador permanecerão.',
      checkInput: 'apagar este projeto',
      placeholder: 'Por favor escreva "{{0}}" para aprovar',
      inputError: 'O que escreveu não coincide com "{{0}}"',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    question: {
      title: 'Tem a certeza?',
      text: 'Isto irá apagar irreversivelmente esta pergunta e a sua resposta.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    shift: {
      title: 'Quer mesmo apagar este turno?',
      text: 'Todos os pedidos para este turno serão removidos.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    tab: {
      title: 'Tem a certeza?',
      text: 'O separador junto com todas as suas perguntas serão apagados.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    tag: {
      title: 'Quer mesmo apagar esta etiqueta?',
      text: 'Todos os turnos pertencendo a esta etiqueta serão apagados. Isso inclui todos os pedidos para os turnos. <br><br> Para confirmar escreva "apagar".',
      checkInput: 'apagar',
      placeholder: 'Por favor escreva "{{0}}" para aprovar',
      inputError: 'O que escreveu não coincide com "{{0}}"',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    team: {
      title: 'Quer mesmo apagar esta equipa?',
      text: 'A equipa será retirada de todos os turnos existentes planeados para o futuro. Pedidos aprovados para esses turnos serão reatribuídos a outras equipas. <br><br> Para confirmar escreva "apagar".',
      checkInput: 'apagar',
      placeholder: 'Por favor escreva "{{0}}" para aprovar',
      inputError: 'O que escreveu não coincide com "{{0}}"',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Quer mesmo apagar o modelo?',
      text: '',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    user: {
      title: 'Quer mesmo apagar este utilizador?',
      text: 'Todas as permissões do projeto serão removidas.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    },
    wholeWeek: {
      title: 'Quer mesmo apagar a semana inteira?',
      text: 'Todos os turnos desta semana serão apagados também.',
      confirm: 'Apagar',
      cancel: 'Cancelar'
    }
  },
  request: {
    approve: {
      title: 'Quer mesmo aprovar este publicador?',
      text: 'Este publicador foi rejeitado no passado. Por favor, certifique-se de que o publicador ainda está apto e disposto a participar.',
      confirm: 'Sim',
      cancel: 'Não'
    },
    cancel: {
      title: 'Tem a certeza?',
      text: 'Esta equipa irá ser apagada se você for o útlimo participante.',
      confirm: 'Sim, cancelar a minha participação',
      cancel: 'Não'
    },
    decline: {
      title: 'Quer mesmo rejeitar o publicador?',
      text: 'Se o publicador já foi informado, irá receber um email de reversão.',
      confirm: 'Sim',
      cancel: 'Não'
    },
    maxReached: {
      title: 'Demasiados utilizadores seleccionados',
      text: 'Definir o limite máximo da equipa de {{0}} a {{1}} e aprovar os seleccionados?',
      confirm: 'Aprovar seleccionados',
      cancel: 'Cancelar'
    },
    minNotReached: {
      title: 'Não foram seleccionados utilizadores suficientes',
      text: 'Definir o limite mínimo da equipa de {{0}} a {{1}} e aprovar os seleccionados?',
      confirm: 'Aprovar seleccionados',
      cancel: 'Cancelar'
    },
    minReached: {
      title: 'Quer mesmo rejeitar o publicador?',
      text: 'O limite mínimo desta equipa foi atingido. Se recusar este utilizador, o sistema irá remover esta equipa.',
      confirm: 'Remover equipa',
      cancel: 'Não'
    },
    noNewTeamleader: {
      title: 'Quer mesmo rejeitar o publicador?',
      text: 'Infelizmente não há outro dirigente nesta equipa. Se recusar este utilizador, o sistema irá remover esta equipa.',
      confirm: 'Remover equipa',
      cancel: 'Não'
    }
  }
}

export default swal
