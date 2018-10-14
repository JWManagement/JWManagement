module.exports = {
  servers: {
    one: {
      host: process.env.SERVER_IP,
      username: 'root',
      password: process.env.SERVER_PASSWORD
    }
  },
  app: {
    name: 'JWManagement',
    path: '../',
    docker: {
      image: 'zodern/meteor:root'
    },
    servers: {
      one: {}
    },
    env: {
      ROOT_URL: 'https://production.jwmanagement.org',
      MONGO_URL: process.env.MONGO_URL,
      MONGO_OPLOG_URL: process.env.MONGO_OPLOG_URL,
      MAIL_URL: process.env.MAIL_URL,
      APM_ID: process.env.APM_ID,
      APM_KEY: process.env.APM_KEY,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      LOGGLY_TOKEN: process.env.LOGGLY_TOKEN
    },
    buildOptions: {
      serverOnly: true
    },
    enableUploadProgressBar: false
  },
  proxy: {
    domains: 'production.jwmanagement.org',
    ssl: {
      letsEncryptEmail: 'support@jwmanagement.org'
    }
  }
};
