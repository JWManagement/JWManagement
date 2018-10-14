import { Meteor } from 'meteor/meteor'
import loggly from 'loggly'

let Logger

if (Meteor.isProduction) {
  Logger = loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'dev',
    auth: {
      'username': 'my-username',
      'password': 'my-password'
    },
    tags: ['meteor', 'loggly'],
    json: true
  })

  Logger.error = e => Logger.log(e)
} else {
  Logger = {
    log (message) {
      console.log(message)
    },
    error (message) {
      console.error(message)
    }
  }
}

export { Logger }

Meteor.startup(function () {
  Logger.log('JW Management Server started!')
})

Meteor.methods({
  'logger.log' (message) {
    Logger.log({ message: 'Client Log', content: message })
  },
  'logger.error' (error) {
    Logger.error({ message: 'Client Error', error })
  }
})

// Catch-all Server's errors
const bound = Meteor.bindEnvironment((callback) => { callback() })
process.on('uncaughtException', function (error) {
  bound(() => {
    Logger.error({ message: 'Server Crash', error: error })
    process.exit(7)
  })
})

// Catch-all Meteor's errors
Meteor._debug = (message, stack) => {
  Logger.log({ message: 'Meteor Error', error: { message, stack } })
}
