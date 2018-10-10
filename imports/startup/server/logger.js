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
} else {
  Logger = {
    log (message) {
      console.log(message)
    }
  }
}

export { Logger }

Meteor.startup(function () {
  Logger.log('JW Management Server started!')
})

Meteor.methods({
  'logger.log' (message) {
    Logger.log(message)
  }
})

// Catch-all Server's errors
const bound = Meteor.bindEnvironment((callback) => { callback() })
process.on('uncaughtException', function (error) {
  bound(() => {
    Logger.log({ message: 'Server Crash', error: error })
    console.error(error.stack)
    process.exit(7)
  })
})

// Catch-all Meteor's errors
const originalMeteorDebug = Meteor._debug
Meteor._debug = (message, stack) => {
  const error = new Error(message)
  error.stack = stack

  Logger.log({ message: 'Meteor Error', error: error })

  return originalMeteorDebug.apply(this, arguments)
}
