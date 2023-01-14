const misc = {
  input: {
    username: 'Nome de utilizador',
    usernameOrEmail: 'Nome de utilizador ou Endereço email',
    firstname: 'Nome',
    lastname: 'Apelido',
    email: 'Endereço email',
    telefon: 'Telefone',
    congregation: 'Congregação',
    languages: 'Línguas',
    gender: 'Sexo',
    privilegeOfService: 'Privilégio de Serviço',
    privilegeOfMinistry: 'Responsabilidade na Congregação',
    password: 'Palavra-passe',
    passwordRepeat: 'Repita palavra-passe',
    newPassword: 'Nova palavra-passe',
    newPasswordRepeat: 'Repita nova palavra-passe'
  },
  role: {
    role: 'Função',
    admin: 'Gestor de projeto',
    shiftScheduler: 'Programador de turnos',
    shiftAdmin: 'Gerente de turnos',
    member: 'Membro',
    teamleader: 'Dirigente de equipa',
    substituteTeamleader: 'Dirigente de equipa substituto',
    participant: 'Participante',
    nothing: 'Nada',
    noPermission: 'Sem permissão'
  },
  permissions: {
    notAdmin: 'Este utilizador não é um gestor de projeto',
    notShiftScheduler: 'Este utilizador não é um programador de turnos',
    notShiftAdmin: 'Este utilizador não é um gestor de turnos',
    notProjectParticipant: 'Este utilizador não está a participar no projecto em questão',
    notTeamleader: 'Este utilizador não é um dirigente de equipa',
    notTagParticipant: 'Este utilizador não pode participar neste turno porque não tem permissões para a etiqueta deste turno.',
    notTeamParticipant: 'Este utilizador não está a participar na equipa em questão'
  },
  time: {
    start: 'Início',
    end: 'Fim',
    suffix: 'horas',
    years: 'anos',
    to: 'até'
  },
  scheduling: {
    name: 'Agendamento',
    direct: 'Aprovar imediatamente',
    manual: 'Aprovar manualmente'
  },
  password: {
    tooShort: 'A palavra-passe deve ter pelo menos 8 caracteres',
    notMatching: 'As palavras-passe não coincidem!'
  },
  weekdays: {
    mo: 'Segunda-feira',
    tu: 'Terça-feira',
    we: 'Quarta-feira',
    th: 'Quinta-feira',
    fr: 'Sexta-feira',
    sa: 'Sábado',
    su: 'Domingo'
  },
  intervals: {
    m: 'Manualmente',
    every: 'Todas as semanas',
    even: 'De duas em duas semanas (par)',
    odd: 'De duas em duas semanas (ímpar)'
  },
  privileges: {
    auxiliary: 'PA',
    regular: 'PR',
    special: 'PS',
    circuit: 'SC',
    bethelite: 'BT',
    ldc: 'LDC',
    coordinator: 'COR',
    secretary: 'SEC',
    serviceOverseer: 'SS',
    elder: 'A',
    servant: 'S',
    publisher: 'P'
  },
  period: {
    d: 'D',
    w: 'S',
    '4w': '4S'
  }
}

export default misc
