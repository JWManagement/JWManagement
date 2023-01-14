const modal = {
  close: 'Fechar',
  addParticipant: {
    title: 'Adicionar participante',
    description: 'Por favor, escolha os publicadores que deseja acrescentar a esta equipa.',
    search: 'Procurar um publicador',
    addAsRequests: 'Adicionar como pedido',
    addAsParticipants: 'Adicionar como participante'
  },
  addVessel: {
    title: 'Adicionar um barco',
    action: 'Adicionar barco'
  },
  addWeek: {
    title: 'Criar nova semana',
    noTemplate: 'Por favor, defina primeiro um modelo',
    defineTemplate: 'Definir modelo',
    action: 'Criar semana',
    text: {
      top: 'Escolha uma semana em que a semana modelo será aplicada:',
      bottom: 'Escolha a semana modelo:'
    }
  },
  cancelTeam: {
    title: 'Cancelar equipa',
    text: 'Descrever porque é que esta equipa tem de ser cancelada. Todos os participantes receberão esta mensagem através de um email de cancelamento.',
    action: 'Cancelar equipa'
  },
  copyShift: {
    title: 'Copiar turno',
    text: 'Selecione os dias para os quais pretende copiar este turno.',
    action: 'Copiar turno'
  },
  editShift: {
    title: 'Editar informação de turno',
    mainData: 'Detalhes principais',
    tag: 'Etiqueta',
    team: 'Equipa',
    teams: 'Equipas designadas para este turno',
    helpText: {
      tag: 'Definir esta etiqueta de turno. Todos os utilizadores com permissões desta etiqueta podem ver o turno.',
      scheduling: 'Pedidos \'Aprovar imediatamente\' serão aprovados automaticamente quando for atingido o limite mínimo de participantes.'
    },
    addTeam: 'Adicionar uma nova equipa',
    teamMin: 'Mínimo de participantes:',
    teamMax: 'Máximo de participantes:',
    teamStart: 'Início:',
    teamEnd: 'Fim:',
    teamPlace: 'Lugar:',
    removeTeam: 'Remover esta equipa',
    noMeeting: 'Não há Reunião',
    action: 'Ação:',
    delete: 'Eliminar',
    switch: 'Planificar turno',
    copyShift: 'Copiar turno'
  },
  editTeamPicture: {
    title: 'Mudar imagem da equipa',
    currentPicture: 'Imagem atual:',
    hints: 'Esta imagem será provavelmente maior para o publicador.',
    noPictureUploaded: 'Ainda não carregou nenhuma imagem',
    upload: 'Carregar',
    delete: 'Apagar'
  },
  editMeetingPicture: {
    title: 'Mudar imagem do ponto de encontro',
    currentPicture: 'Imagem atual:',
    hints: 'Esta imagem será provavelmente maior para o publicador.',
    noPictureUploaded: 'Ainda não carregou nenhuma imagem',
    upload: 'Carregar',
    delete: 'Apagar'
  },
  editVessel: {
    title: 'Editar barco',
    action: 'Guardar alterações'
  },
  inviteUser: {
    title: 'Convidar novos publicadores',
    key: '<span class="text-warning">nomes em laranja</span> já foram convidados.',
    selectAll: 'Selecionar todos',
    noUsers: 'Sem novos publicadores',
    invite: 'Convidar'
  },
  position: {
    title: 'Marque a posição com um clique esquerdo do rato'
  },
  shift: {
    clickToEnlarge: 'Clique na imagem para aumentá-la',
    openLink: 'Ver informação ligada',
    meetingAt: 'Ponto de encontro em',
    collapseTeam: 'Recolher informações da equipa e pontos de encontro',
    expandTeam: 'Expandir informações da equipa e pontos de encontro',
    noParticipants: 'Sem participantes',
    requestTeam: 'Pedir participação',
    requestTeamAgain: 'Pedir participação novamente',
    requests: 'Pedidos',
    cancelTeam: 'Cancelar equipa',
    cancelRequest: 'Cancelar pedido',
    cancelParticipation: 'Cancelar participação',
    addParticipant: 'Adicionar participante',
    closedTeam: 'Esta equipa está fechada. Não se pode solicitar a participação.',
    maximumReached: 'O limite máximo de participantes da equipa já foi atingido',
    noPermission: 'Você não tem permissão para agendar utilizadores',
    noTeamleader: 'Este utilizador não tem permissão para ser um líder de equipa',
    alreadyTeamleader: 'Este utilizador já é um líder de equipa',
    openTeam: 'Abrir equipa',
    closeTeam: 'Fechar equipa',
    sendUnderstaffed: 'Enviar email de falta de pessoal',
    switch: 'Editar turno',
    existingTeamleaders: 'O dirigente da equipa existe',
    noExistingTeamleader: 'Falta dirigente de equipa',
    notTeamleader: 'Sem dirigente de equipa',
    selected: 'Seleccionado:',
    of: 'de',
    approveSelected: 'Aprovar seleccionado',
    declineSelected: 'Rejeitar seleccionado',
    removeSelected: 'Remover seleccionado',
  },
  route: {
    title: 'Criar/editar rota',
    routeMarkers: 'Marcador de rota',
    addRouteMarkers: 'Clique no mapa para adicionar um novo marcador de rota'
  },
  uploadUserFile: {
    title: 'Carregamento de Ficheiro-Utilizador',
    helpText: 'Ordem dos dados pessoais (* campos são obrigatórios): <br> Email*, Nome*, Apelido*, Sexo(h ou m)*, Número de telefone, Privilégio de serviço (\'publicador\', \'auxiliar\', \'regular\', \'especial\', \'circuito\', \'betelita\' ou \'ldc\'), Responsabilidade na Congregação (\'publicador\', \'servo\', \'ancião\', \'coordenador\', \'secretário\' or \'superintendenteDeServiço\'), Congregação, Língua de Conta (\'en-US\', \'en-GB\', \'de\', ...), Línguas estrangeiras faladas (e.g. \'Alemão, Francês\'), Permissões (ver exportação de utilizadores para ter um exemplo)',
    helpEncoding: 'O ficheiro tem de ser codificado em UTF-8 para suportar todos os caracteres',
    uploadFile: 'Carregar ficheiro CSV',
    new: 'Novos publicadores',
    existing: 'Publicadores com conta no JW Management',
    name: 'Nome',
    email: 'Email',
    add: 'Adicionar utilizadores'
  },
  mergeAccounts: {
    title: 'Fusão de contas',
    description: 'Introduza as credenciais da conta na qual pretende fundir as permissões desta conta. Será imediatamente ligado a essa conta.',
    username: 'Nome de utilizador',
    password: 'Palavra-passe',
    merge: 'Fusionar contas'
  }
}

export default modal
