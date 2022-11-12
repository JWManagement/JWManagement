const modal = {
  close: 'Fechar',
  addParticipant: {
    title: 'Adicionar participante',
    description: 'Por favor escolha o publicador que você quer adicionar a este turno.'
  },
  addWeek: {
    title: 'Criar nova semana',
    action: 'Crie nova semana',
    text: {
      top: 'Escolha uma semana, à qual a semana padrão vai ser aplicada:',
      bottom: 'Escolha a semana padrão:'
    }
  },
  cancelTeam: {
    title: 'Cancelar equipa',
    text: 'Descreva porque esta equipa tem de ser cancelada. Todos os participantes irão receber esta mensagem através do mail de cancelamento.',
    action: 'Cancelar equipa'
  },
  editShift: {
    title: 'Editar informação de turno',
    mainData: 'Detalhes principais',
    tag: 'Rótulo',
    team: 'Equipa',
    teams: 'Equipas designadas para este turno',
    helpText: {
      tag: 'Estabeleça o rótulo para este turno. Todos os usuários com permissões neste rótulo conseguem visualizar este turno.',
      scheduling: 'Petições do tipo "Aceitar Imediatamente" irão ser aceites automáticamente, quando o limite minimo de participantes para a próxima equipa for alcançado.'
    },
    teamMin: 'Minimo de participantes:',
    teamMax: 'Máximo de participantes:',
    teamStart: 'Começa:',
    teamEnd: 'Acaba:',
    noMeeting: 'Sem encontro',
    action: 'Acção:',
    delete: 'Apagar',
    switch: 'Planejar turno'
  },
  editTeamPicture: {
    title: 'Mudar imagem de equipa.',
    currentPicture: 'Imagem atual:',
    hints: 'Esta imagem irá provavelmente ser exibida maior para o publicador.',
    noPictureUploaded: 'Você ainda não carregou nenhuma imagem.',
    upload: 'Carregar',
    delete: 'Apagar'
  },
  editMeetingPicture: {
    title: 'Mudar imagem de ponto de encontro',
    currentPicture: 'Imagem atual:',
    hints: 'Esta imagem irá provavelmente ser exibida maior para o publicador.',
    noPictureUploaded: 'Você ainda não carregou nenhuma imagem',
    upload: 'Carregar',
    delete: 'Apagar'
  },
  inviteUser: {
    title: 'Convide Novos Publicadores',
    key: '<span class="text-warning">Nome Laranja</span> significa que o usuário já foi convidado.',
    selectAll: 'Selecionar Tudo',
    noUsers: 'Não encontrados novos publicadores',
    invite: 'Convidar'
  },
  position: {
    title: 'Marque posicão com botão esquerdo do rato.'
  },
  shift: {
    collapseTeam: 'Colapsar Rota e Pontos de Encontro',
    expandTeam: 'Expandir Rota e Pontos de Encontro',
    noParticipants: 'Nenhuns participantes',
    requestTeam: 'Requesitar participação',
    requestTeamAgain: 'Requesitar participação novamente',
    requests: 'Requesições',
    cancelRequest: 'Cancelar requisição',
    cancelParticipation: 'Cancelar participação',
    addParticipant: 'Adicionar participante',
    closedTeam: 'Esta equipa esta fechada. Não pode requisitar participação.',
    maximumReached: 'Limite máximo de participantes já foi alcançado.',
    noPermission: 'Você nao tem permissão para planejar usuários.',
    noTeamleader: 'Este usuário não tem permissão para ser lider de equipa.',
    alreadyTeamleader: 'Este usuário já é lider de equipa.',
    openTeam: 'Abrir Equipa',
    closeTeam: 'Fechar Equipa',
    switch: 'Editar Turno',
    existingTeamleaders: 'Lider de Equipa já existente.',
    noExistingTeamleader: 'Lider de Equipa não existente.'
  },
  shiftReport: {
    title: 'Relatório',
    teamleader: 'Lider de Equipa',
    substituteTeamleader: 'Lider de equipa Substituto',
    publications: 'Publicações',
    occurrences: 'Occurrências',
    store: 'Loja',
    experiences: 'Experiências',
    present: 'Presente',
    sick: 'Doente',
    missing: 'Ausente',
    name: 'Nome',
    language: 'Linguagem',
    count: 'Contagem',
    action: 'Acção',
    noPublications: 'Nenhuma publicação',
    select_publication: 'Selecione uma publicação',
    selectPublicationFirst: 'Por favor selecione uma publicação primeiro',
    texts: 'Texto Biblico',
    speaks: 'Conversas',
    videos: 'Videos Mostrados',
    returnVisits: 'Revisitas',
    bibleStudies: 'Estudos Biblicos',
    time: 'Horas no Serviço',
    trolleysFilled: 'Carrinhos preenchidos',
    neatnessLast: 'Condição do carrinho após o último turno.',
    bad: 'Má',
    normal: 'Normal',
    good: 'Boa',
    yes: 'Sim',
    no: 'Não',
    expRoute: 'Rota',
    expGood: 'Boas Experiências',
    expProblems: 'Problemas / Dificuldades',
    date: 'Data',
    toShift: 'Para o Turno'
  },
  route: {
    title: 'Criar/Editar Rota',
    routeMarkers: 'Marcador de Rota',
    addRouteMarkers: 'Clique no mapa para adicionar um novo marcador de rota.'
  },
  uploadUserFile: {
    title: 'Carregar Ficheiro-Usuário',
    uploadFile: 'Carregar Ficheiro-CSV',
    name: 'Nome',
    email: 'Email',
  }
}

export default modal
