const authentication = {
  landing: {
    title: 'Welcome to JW Management',
  },
  signIn: {
    name: 'Entrar',
    text: 'Por favor insira os detalhes da sua conta pessoal para entrar.',
    forgot: 'Esqueceu-se da sua palavra passe?',
    create: 'Criar conta'
  },
  forgotPassword: {
    name: 'Palavra passe anterior',
    text: 'Insira o seu endereço de correio electrónico e nós enviaremos uma atalho para você restabelecer a sua palavra passe.',
    button: 'Enviar o seu endereço de correio electrónico para recuperar a palavra passe',
    back: 'Voltar à página inicial',
    noUserForThisEmail: 'Não existe nenhuma conta que corresponda a este endereço de correio electrónico.',
    multipleAccountsForThisEmail: 'Existem diversas contas com este endereço de correio electrónico. Por favor especifique o usuário.',
    emailMissing: 'Digite seu endereço de correio electrónico',
    mailSent: 'Em breve você receberá mais informação por correio electrónico. Siga o atalho que enviamos por correio electrónico para redefinir a sua senha.'
  },
  resetPassword: {
    name: 'Restabelecer a sua palavra passe.',
    text: 'Por favor digite uma nova palavra passe para {{0}} {{1}}.',
    noUserFound: '<p>Endereço inválido</p><p>Confirme o URL</p>',
    button: 'Mudar palavra-passe',
    back: 'Voltar à página inicial'
  },
  firstLogin: {
    name: 'Bem Vindo',
    text: '<p>Estamos felizes de lhe dar as boas vindas.</p><p>Por favor crie o seu nome de usuário e a sua palavra passe. Use termos simples de reter, irá necessitar de ambos para se conetar ao sistema.</p><p>Depois disso, pode começar a usar o JWManagement.</p><p>Desfrute!</p>',
    button: 'Vamos!',
    tokenError: 'Erro. Por favor contacte o Administrador (support@jwmanagement.org) ou o seu Coordenador de Projeto.',
    usernameExists: 'Este nome de usuário já está sendo utilizado. Por favor escolha outro.',
    usernameMissing: 'Por favor insira um nome de usuário.'
  }
}

export default authentication
