module.exports = {
  servers: {
    one: {
      host: process.env.SERVER_IP_DELIVER,
      username: 'root',
      password: process.env.SERVER_PASSWORD_DELIVER
    }
  },
  app: {
    name: 'JWManagementDeliver',
    path: '../',
    docker: {
      image: 'zodern/meteor:root'
    },
    servers: {
      one: {}
    },
    env: {
      ROOT_URL: 'https://www.jwmanagement.org',
      MONGO_URL: process.env.MONGO_URL,
      MONGO_OPLOG_URL: process.env.MONGO_OPLOG_URL,
      MAIL_URL: process.env.MAIL_URL,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    },
    buildOptions: {
      serverOnly: true
    },
    enableUploadProgressBar: false
  },
  proxy: {
    domains: 'jwmanagement.org,www.jwmanagement.org',
    ssl: {
      letsEncryptEmail: 'support@jwmanagement.org'
    }
  }
};
