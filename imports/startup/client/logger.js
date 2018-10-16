import { Meteor } from 'meteor/meteor'

const Logger = {
  log (message) {
    Meteor.call('logger.log', message)
  },
  error (error) {
    Meteor.call('logger.error', error)
  }
}

export { Logger }

Meteor.startup(function () {
  Logger.log('JW Management Client started!')
})

// Catch-all Client's errors
Meteor.startup(function () {
  const _GlobalErrorHandler = window.onerror

  window.onerror = (msg, url, line) => {
    Logger.error({ message: msg, file: url, line: line })

    if (_GlobalErrorHandler) {
      _GlobalErrorHandler.apply(this, arguments)
    }
  }
})
