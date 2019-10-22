module.exports = {
  servers: {
    one: {
      host: process.env.JWMD1_IP,
      username: 'root',
      password: process.env.JWMD1_PW,
    },
    two: {
      host: process.env.JWMD2_IP,
      username: 'root',
      password: process.env.JWMD2_PW,
    },
  },
  app: {
    name: 'JWManagementDeliver',
    path: '../',
    docker: {
      image: 'zodern/meteor:root'
    },
    servers: {
      one: {},
      two: {},
    },
    env: {
      ROOT_URL: 'https://deliver.jwmanagement.org',
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
    domains: 'jwmanagement.org,deliver.jwmanagement.org,www.jwmanagement.org',
    ssl: {
      letsEncryptEmail: 'support@jwmanagement.org'
    }
  }
};
