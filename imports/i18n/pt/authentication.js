const authentication = {
  signIn: {
    name: 'Login',
    text: 'Por favor insira seus detalhes de conta pessoal para Entrar.',
    forgot: 'Esqueceu sua palavra-passe?',
    create: 'Criar conta'
  },
  forgotPassword: {
    name: 'Palavra-passe anterior',
    text: 'Insira seu email e nós enviaremos um endereço para você restabelecer sua palavra-passe.',
    button: 'Enviar endereço para palavra-passe',
    back: 'Voltar à página inicial',
    noUserForThisEmail: 'Não existe conta que corresponda a este email.',
    multipleAccountsForThisEmail: 'Existem diversas contas com este email. Por favor especifique o usuário.',
    emailMissing: 'Digite seu endereço de e-mail',
    mailSent: 'Você receberá um e-mail em breve. Siga o link no e-mail para redefinir sua senha.'
  },
  resetPassword: {
    name: 'Restabelecer sua palavra-passe.',
    text: 'Por favor digite uma nova palavra-passe para {{0}} {{1}}.',
    noUserFound: '<p>Endereço inválido</p><p>Confirme o URL</p>',
    button: 'Mudar palavra-passe',
    back: 'Voltar à página inicial'
  },
  firstLogin: {
    name: 'Bem Vindo',
    text: '<p>Estamos felizes de lhe dar as boas vindas.</p><p>Por favor crie seu nome de usuário e palavra-passe. Irá necessitar de ambos para se conetar ao sistema.</p><p>Depois disso, pode começar a usar o JWManagement.</p><p>Desfrute!</p>',
    button: 'Vamos!',
    tokenError: 'Erro. Por favor contacte o Administrador (support@jwmanagement.org) ou o seu Lider de Projeto.',
    usernameExists: 'Este nome de usuário já está sendo utilizado. Por favor escolha outro.',
    usernameMissing: 'Por favor insira um nome de usuário.'
  }
}

export default authentication
