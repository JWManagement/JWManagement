const pages = {
  profile: {
    name: 'O meu Perfil',
    personalData: 'Os meus dados pessoais',
    changePicture: 'Editar imagem...',
    options: {
      title: 'Definições',
      helpText: {
        mergeAccounts: 'No JW Management pode fazer tudo com apenas uma conta. Só tem de se lembrar de um nome de utilizador e palavra-passe. Se tiver várias contas, clique em "Fusionar contas" e introduza as credenciais da sua outra conta. Isto irá fundir as permissões desta conta na conta especificada.'
      }
    },
    availability: {
      title: 'Disponibilidade',
      helpText: 'Por favor marque as horas em que está disponível.',
      shortTermCalls: 'Posso ser contactado a curto prazo',
      shortTermCallsAlways: 'Mesmo que não haja disponibilidade definida'
    },
    speaks: 'Fala',
    telefon: 'Telefone',
    congregation: 'Congregação',
    language: 'Língua da conta',
    languages: 'Línguas estrangeiras',
    gender: 'Sexo',
    _gender: {
      brother: 'Irmão',
      sister: 'Irmã'
    },
    publisher: 'Publicador(a)',
    privilegeOfService: 'Privilégio de serviço',
    _privilegeOfService: {
      auxiliaryPioneer: 'Pioneiro auxiliar',
      pioneer: 'Pioneiro regular',
      specialPioneer: 'Pioneiro especial',
      circuitOverseer: 'Superintendente de circuito',
      bethelite: 'Betelita',
      fulltimeConstructionServant: 'Servo de construção'
    },
    ministryPrivilege: 'Responsabilidade na Congregação',
    _ministryPrivilege: {
      ministerialServant: 'Servo ministerial',
      elder: 'Ancião',
      coordinator: 'Coordenador',
      secretary: 'Secretário',
      serviceOverseer: 'Superintendente de serviço'
    },
    placeholder: {
      telefon: '(ex. +351 214-690-600)',
      congregation: 'Congregação',
      languages: 'Línguas'
    },
    changePassword: 'Mudar palavra-passe',
    deleteAccount: 'Apagar conta',
    mergeAccounts: 'Fusionar contas',
    vacation: {
      title: 'Férias',
      helpText: 'Por favor, acrescente os períodos em que não está disponível.'
    },
    until: 'até',
    addVacation: 'Adicionar Férias',
    deleteVacation: 'Apagar estas férias',
    usernameTaken: 'Este nome de utilizador já está a ser usado por outra pessoa. Por favor escolha outro.'
  },
  wiki: {
    name: 'Centro de informações',
    nameShort: 'Info',
    files: 'Ficheiros',
    addQuestion: 'Adicionar pergunta/título',
    edit: 'Editar',
    delete: 'Apagar',
    noFiles: 'Sem ficheiros disponíveis',
    addTab: 'Adicionar um novo separador',
    editQuestion: 'Editar esta pergunta',
    removeFaq: 'Remover esta pergunta',
    editFaq: 'Editar esta resposta',
    changeFaq: 'Guardar esta resposta',
    cancelFaq: 'Cancelar edição'
  },
  shifts: {
    name: 'Turnos',
    route: 'Rota',
    addShift: 'Adicionar um novo turno',
    deleteWeek: 'Apagar a semana inteira',
    addWeek: 'Adicionar uma nova semana',
    requests: 'Pedidos',
    openRequests: 'Pedidos abertos',
    automation: 'Automático',
    template: 'Modelo',
    noVisibleShifts: 'Sem turnos com essa etiqueta esta semana',
    start: 'Início',
    end: 'Fim',
    visibility: 'Visibilidade:',
    helpText: {
      start: 'Esta é a primeira semana a ser criada pelo sistema.',
      end: 'Esta é a última semana a ser criada pelo sistema.',
      visibility: 'Isto define com quantas semanas de antecedência os publicadores poderão ver e fazer pedidos. Respeitando a semana inicial e final, o sistema criará automaticamente os turnos necessários.'
    },
    weeks: 'semanas',
    hideNames: 'Ocultar todos os nomes nos turnos',
    showNames: 'Mostrar todos os nomes nos turnos',
    editShifts: 'Editar os turnos',
    prevWeek: 'Ir para a semana anterior',
    nextWeek: 'Ir para a próxima semana',
    sendWeek: 'Enviar confirmações para todos os turnos desta semana por email',
    shownTag: 'Turnos desta etiqueta estão visíveis',
    hiddenTag: 'Turnos desta etiqueta estão escondidos',
    shift: {
      tag: 'Etiqueta',
      schedule: 'Planejamento',
      teamleader: 'Dirigente de equipa',
      teams: 'Equipas',
      noTeams: 'Sem equipas',
      participants: 'Participantes',
      start: 'Início',
      end: 'Fim',
      requests: 'Pedido',
      requests_plural: 'Pedidos',
      requestsOf: 'Pedido de',
      requestsOf_plural: 'Pedidos de',
      teamleaders: 'DEs',
      noPermission: 'Apenas um administrador de projeto ou de turno está autorizado a editar ou programar turnos.'
    }
  },
  day: {
    removeAll: 'Remover tudo'
  },
  settings: {
    main: {
      title: 'Definições principais',
      id: 'ID',
      name: {
        text: 'Nome',
        placeholder: 'Nome do projeto',
        helpText: 'Geralmente o nome do projecto é o nome da congregação. Para projetos maiores, incluindo múltiplas congregações, pode ser o nome da cidade onde o projecto será efetuado. Se o projecto não organiza o testemunho com carrinhos, o nome pode também refletir o que será organizado com este projeto.'
      },
      news: {
        text: 'Novidades',
        placeholder: 'Sem novidades',
        helpText: 'As notícias aparecerão no topo da visão geral do projecto. Pode ser utilizada para comunicar com os seus participantes.'
      },
      email: {
        text: 'Email',
        placeholder: 'Endereço email do projeto',
        helpText: 'Em emails como confirmações de turno e actualizações do dirigente de equipa, este endereço será definido como o endereço \'Responder a\', para que se os destinatários responderem a estes emails, a resposta será normalmente enviada para a caixa de entrada deste endereço. Além disso, este endereço será notificado (por exemplo, sobre cancelamentos de participação a curto prazo).'
      },
      language: {
        text: 'Língua',
        helpText: 'Se o sistema notifica o endereço listado acima sobre alterações, enviará os emails na língua que especificar aqui.'
      },
      deleteProject: 'Apagar projetos'
    },
    tags: {
      title: 'Etiquetas',
      helpText: '<p>Cada turno tem de ter uma etiqueta. Além disso, para cada utilizador pode ser permitida ou negada a permissão para ver os turnos, dependendo das etiquetas.</p><p>As etiquetas podem reflectir diferentes atividades (por exemplo, testemunhos com carrinhos, stand de informação, testemunho de rua, etc.). A divisão dos turnos em diferentes etiquetas pode ser útil, por exemplo, se houver vários turnos ao mesmo tempo ou se apenas determinados publicadores forem treinados num tipo específico de testemunho.</p><p>Para cada etiqueta pode haver um conjunto de semanas modelo que tenham sido previamente definidas.</p>',
      id: 'ID',
      name: 'Nome',
      img: {
        name: 'Imagem',
        helpText: 'Esta imagem será mostrada no painel ao clicar em \'Turnos\'. Deve explicar o tipo de tarefas feitas nos turnos desta etiqueta. Se quiser adicionar uma imagem personalizada, envie-nos um e-mail descrevendo a sua ideia para support@jwmanagement.org.'
      },
      templates: 'Modelos',
      showTemplate: 'Editar turnos',
      editTemplate: 'Editar nomes',
      removeTemplate: 'Apagar',
      addTemplate: 'Definir novo modelo',
      action: 'Ação',
      none: 'Nenhuma etiqueta foi adicionada',
      add: 'Adicionar uma nova etiqueta',
      remove: 'Remover esta etiqueta'
    },
    teams: {
      title: 'Equipas',
      helpText: {
        main: 'Para cada turno tem de haver pelo menos uma equipa. As equipas podem representar rotas ou locais diferentes. Um participante do turno é sempre membro de uma destas equipas.',
        picture: 'Os publicadores poderão ver esta imagem. Por isso, deve dar informações suplementares para as tarefas desta equipa. Por exemplo, poderá criar uma rota para esta equipa no Google Maps ou OpenStreetMap (dependendo de qual tem melhor cobertura na sua área) e carregar uma imagem disso aqui.',
        link: 'Este link será ligado com a imagem. Se o utilizador clicar na imagem será reencaminhado para este link. Por exemplo, pode pôr aqui o link do mapa Google Maps ou OpenStreetMap.',
        description: 'Aqui pode, opcionalmente, definir uma descrição para esta equipa. Por exemplo, poderá explicar algumas particularidades desta equipa ou rota.'
      },
      id: 'ID',
      name: 'Nome',
      icon: 'Ícone',
      picture: 'Imagem',
      editPicture: 'Carregar imagem para equipa',
      noPicture: 'Nenhuma imagem carregada',
      link: 'Link',
      description: 'Descrição',
      action: 'Ação',
      none: 'Sem equipa ainda',
      add: 'Adicionar nova equipa',
      remove: 'Remover esta equipa'
    },
    meetings: {
      title: 'Ponto de encontro',
      helpText: {
        main: 'Para todas as equipas de turno pode haver um ponto de encontro designado. Assim, as equipas podem reunir-se de forma independente umas das outras. Isto pode ser útil quando o percurso ou a localização das equipas estão tão afastados que uma reunião comum seria demasiado demorada.',
        picture: 'Os publicadores poderão ver esta imagem. Por isso, deve dar informações suplementares sobre o ponto de encontro. Por exemplo, poderá carregar uma imagem da zona no Google Maps ou OpenStreetMap.'
      },
      id: 'ID',
      name: 'Nome',
      picture: 'Imagem',
      editPicture: 'Carregar imagem para este ponto de encontro',
      noPicture: 'Nenhuma imagem carregada',
      action: 'Ação',
      none: 'Sem pontos de encontro ainda',
      add: 'Adicionar um novo ponto de encontro',
      remove: 'Remover este ponto de encontro'
    }
  }
}

export default pages
