const authentication = {
  landing: {
    title: 'Bem-vindo(a) ao JW Management!',
  },
  signIn: {
    name: 'Entrar',
    text: 'Por favor, insira os detalhes da sua conta pessoal para entrar.',
    forgot: 'Esqueceu-se da sua palavra-passe?',
    create: 'Criar conta'
  },
  signUp: {
    name: 'Criar conta',
    text: '<p>Gostaria de testar o sistema e gerir o seu próprio projeto?<p></p>Insira os seus detalhes para criar uma conta.</p>',
    bySigningYouAgreeTo: 'Ao criar uma conta, aceita as nossas',
    terms: 'condições de utilização',
    andOur: 'e a nossa',
    privacyPolicy: 'política de privacidade',
    signIn: 'Já tenho uma conta'
  },
  forgotPassword: {
    name: 'Nome de utilizador ou palavra-passe esquecido(a)',
    text: 'Por favor, digite o seu endereço email. Enviaremos-lhe um link para restabelecer a sua palavra-passe. Esse link vái conectá-lo(a) diretamente e poderá encontrar o seu nome de utilizador.',
    button: 'Enviar link para restabelecer palavra-passe',
    back: 'Voltar à página de conexão',
    noUserForThisEmail: 'Não existe conta com este endereço email',
    multipleAccountsForThisEmail: 'Existem várias contas com este mesmo endereço email. Por favor, especifique um utilizador.',
    emailMissing: 'Falta endereço email',
    mailSent: 'Vai receber um email brevemente. Siga o link para restabelecer a sua palavra-passe.'
  },
  resetPassword: {
    name: 'Restabelecer palavra-passe',
    text: 'Por favor, digite uma nova palavra-passe para {{0}}.',
    noUserFound: '<p>Este link está inválido.</p><p>Por favor, peça um novo email de restabelecimento da palavra-passe.</p>',
    button: 'Mudar palavra-passe',
    back: 'Voltar à página de conexão'
  },
  firstLogin: {
    name: 'Bem-vindo(a)!',
    text: '<p>Estamos contentes de o(a) acolher.</p><p>Por favor, escolha um nome de utilizador e uma palavra-passe. A partir de agora vai ter de usá-los para se ligar ao sistema.</p><p>Depois disso, pode começar a usar o JW Management.</p><p>Aproveite!</p>',
    agreeTerms: 'Eu aceito as <a href="/en/terms" target="blank">condições de utilização</a> e a <a href="/de/privacy" target="blank">política de privacidade</a>',
    button: 'Vamos!',
    tokenError: 'Expired link. This is not valid any more. Please ask for a new email or try to reset your password.',
    plainTextToken: 'Seems like your email client doesn\'t support HTML emails. Please open the email with a modern email client to get the full link.',
    tokenMissing: 'Link inválido. Por favor, use o link do email.',
    usernameExists: 'Este nome de utilizador já está a ser utilizado. Por favor, escolha outro.',
    usernameMissing: 'Por favor, insira um nome de utilizador.',
    usernameCannotBeEmail: 'Desculpe, o nome de utilizador não pode ser o endereço email. Por favor, escolha outro nome de utilizador.',
    agreeTermsMissing: 'Por favor, aceite as condições de utilização e a política de privacidade.',
    buttonCreateAccount: 'Criar conta',
    buttonHaveAccount: 'Já tenho uma conta'
  }
}

export default authentication
