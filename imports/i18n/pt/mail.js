const mail = {
  footer: 'Isto é um email automático. Não esperamos uma resposta.',
  link: 'Abrir JWManagement',
  accountCreated: {
    subject: 'Conta JWManagement Criada!',
    headline: 'Bem Vindo/Vinda!',
    hello: 'Olá',
    text1: 'Nós criamos uma conta para você em JWManagement. Pode criar o seu nome de usuário e palavra-passe por pressionar o botão em baixo.',
    text2: 'Em caso de problemas, não hesite em nos contactar.<br>Desejamos que desfrute do seu uso de JWManagement.<br>Seus irmãos da equipe JWManagement',
    button: 'Vamos!'
  },
  teamCancellation: {
    subject: 'Equipe Cancelada.',
    headline: 'A equipe foi cancelada.',
    hello: 'Olá',
    text: 'Infelizmente tivemos de o informar que a sua equipe designada para a data <b>{{date}}</b> às <b>{{time}}</b> horas foi <u>cancelada</u>.',
    missingParticipant: 'Um participante esta faltando. Se houverem participantes suficientes, a equipe pode voltar a tomar lugar.'
  },
  confirmation: {
    subject: 'Aceite de novo pedido',
    headline: 'Seu pedido foi aceite!',
    hello: 'Olá',
    text1: 'Seu pedido para o seguinte turno foi aceite:',
    datetime: '{{date}} A partir das {{time}} horas'
  },
  declined: {
    subject: 'Pedido não considerado',
    headline: 'O pedido não foi considerado',
    hello: 'Olá',
    text1: 'Infelizmente seu pedido para o seguinte turno não pode ser considerado:',
    text2: 'Muito obrigado pelo seu pedido!',
    datetime: '{{date}} A partir das {{time}} horas'
  },
  reversal: {
    subject: 'Reversão',
    hello: 'Olá',
    text1: 'Você foi removido da seguinte equipe:',
    datetime: '{{date}} A partir das {{time}} horas'
  },
  teamUpdate: {
    subject: 'Equipe mudada',
    _changed: 'mudada',
    changed: {
      participant: 'Um participante',
      time: 'A hora',
      location: 'O local',
      leader: 'O lider de equipe'
    },
    hello: 'Olã',
    text1: 'Você está marcado/a como lider de equipe ou lider,por isso gostariamos de o/a informar de mudanças na sua equipe.',
    text2: 'Aqui está a configuração currente da equipe',
    datetime: '{{date}} A partir das {{time}} horas'
  },
  understaffed: {
    subject: 'Equipe faltando pessoal',
    headline: 'A equipe tem falta de pessoal',
    hello: 'Olá',
    text1: 'A seguinte equipe tem falta de pessoal e precisa de um/uma',
    text2: 'Por favor veja se tem possibilidade de ajudar esta equipe',
    datetime: '{{date}} A partir das {{time}} horas'
  },
  resetPassword: {
    subject: 'Restabelecer palavra-passe',
    headline: 'Restabelecer a sua palavra-passe',
    text1: 'Olá,<br>Por favor clique o seguinte botão para criar uma nova palavra-passe:',
    button: 'Restabelecer palavra-passe',
    text2: '<p>Dicas utéis em como criar palavras-passe seguras podem ser encontradas em g01 6/22 p. 31</p><p>Se não requisitou um restabelecimento da sua palavras-passe, pode apagar este email.</p>'
  }
}

export default mail
