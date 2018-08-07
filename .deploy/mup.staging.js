module.exports = {
  servers: {
    one: {
      host: '80.240.27.13',
      username: 'root',
      password: process.env.HOST_PASSWORD
    }
  },
  app: {
    name: 'JWManagement',
    path: '../',
    docker: {
      image: 'abernix/meteord:node-8-base'
    },
    servers: {
      one: {}
    },
    env: {
      ROOT_URL: 'https://staging.jwmanagement.org'
    },
    buildOptions: {
      serverOnly: true
    },
    enableUploadProgressBar: false
  },
  proxy: {
    domains: 'staging.jwmanagement.org',
    ssl: {
      letsEncryptEmail: 'support@jwmanagement.org'
    }
  }
};
