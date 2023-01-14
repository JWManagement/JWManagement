const mail = {
  footer: 'Isto é um email automático. Não esperamos resposta.',
  link: 'Abrir JW Management',
  accountCreated: {
    subject: 'Conta JW Management criada!',
    headline: 'Bem-vindo(a)!',
    hello: 'Bom-dia',
    text1: 'Gostaríamos de informá-lo(a) que criámos a sua conta no JW Management. Pode escolher o seu nome de utilizador e palavra-passe ao clicar no botão abaixo.',
    text2: 'Em caso de problemas, por favor, contacte-nos.<br>Esperamos que goste de utilizar o JW Management.<br>Os seus irmãos do JW Management',
    button: 'Vamos!'
  },
  teamCancellation: {
    subject: 'Equipa cancelada',
    headline: 'Equipa foi cancelada.',
    hello: 'Bom-dia',
    text: 'Infelizmente a sua participação na equipa do dia <b>{{date}}</b> às <b>{{time}}</b> foi <u>cancelada</u>.',
    missingParticipant: 'Não há participantes que chegue. Se participantes suficientes se juntarem, a saída pode voltar a tomar lugar.'
  },
  confirmation: {
    subject: 'Novo pedido aprovado',
    headline: 'O seu pedido foi aprovado!',
    hello: 'Bom-dia',
    text1: 'O seu pedido para o turno seguinte foi aprovado:',
    datetime: '{{date}} às {{time}} horas'
  },
  declined: {
    subject: 'Pedido não considerado',
    headline: 'Pedido não foi considerado',
    hello: 'Bom-dia',
    text1: 'Infelizmente o seu pedido para o seguinte turno não pôde ser considerado:',
    text2: 'Muito obrigado pelo seu pedido!',
    datetime: '{{date}} às {{time}} horas'
  },
  reversal: {
    subject: 'Reversão',
    hello: 'Bom-dia',
    text1: 'Foi retirado da seguinte equipa:',
    datetime: '{{date}} às {{time}} horas'
  },
  teamUpdate: {
    subject: 'Equipa mudada',
    _changed: 'alterado.',
    changed: {
      participant: 'Um participante',
      time: 'As horas',
      location: 'O sítio',
      leader: 'O dirigente de equipa'
    },
    hello: 'Bom-dia',
    text1: 'Está registado como membro ou dirigente da equipa, por isso gostaríamos de informá-lo sobre as seguintes mudanças na sua equipa.',
    text2: 'Aqui está a configuração actual da equipa',
    datetime: '{{date}} às {{time}} horas'
  },
  understaffed: {
    subject: 'Equipa com falta de participantes',
    headline: 'A equipa está com falta de participantes',
    hello: 'Bom-dia',
    text1: 'A seguinte equipa está com falta de participantes e necessita de ',
    text2: 'Por favor, veja se pode ajudar esta equipa.',
    datetime: '{{date}} às {{time}} horas'
  },
  resetPassword: {
    subject: 'Redefenir palavra-passe',
    headline: 'Redefenir a sua palavra-passe',
    text1: 'Bom-dia,<br>Por favor, clique no seguinte botão para definir uma nova palavra-passe:',
    button: 'Redefenir palavra-passe',
    text2: '<p>Dicas úteis para criar uma palavra-passe segura podem ser encontradas em <a href="https://wol.jw.org/pt/wol/d/r5/lp-t/102001451">g01 6/22 p. 31</a></p><p>Se não solicitou a redefinição de uma palavra-passe, sinta-se à vontade para apagar este email.</p>'
  }
}

export default mail
