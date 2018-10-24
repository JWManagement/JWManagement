module.exports = {
  app: {
    type: 'aws-beanstalk',
    name: 'JWManagementStaging',
    path: '../',
    env: {
      ROOT_URL: 'https://staging.jwmanagement.org',
      MONGO_URL: process.env.MONGO_URL,
      MONGO_OPLOG_URL: process.env.MONGO_OPLOG_URL,
      MAIL_URL: process.env.MAIL_URL,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      LOGGLY_TOKEN: process.env.LOGGLY_TOKEN
    },
    auth: {
      id: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY
    },
    minInstances: 1,
    maxInstances: 10,
    instanceType: 't3.micro',
    sslDomains: ['staging.jwmanagement.org'],
    forceSSL: true,
    region: 'eu-central-1',
    gracefulShutdown: false,
    oldVersions: 3,
    buildOptions: {
      buildLocation: '../build'
    }
  },
  plugins: ['mup-aws-beanstalk']
};
