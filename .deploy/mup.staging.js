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
    buildOptions: {
      serverOnly: true
    },
    ssl: {
      autogenerate: {
        email: 'support@jwmanagement.org',
        domains: 'www.jwmanagement.org'
      }
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
