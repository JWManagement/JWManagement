import { Meteor } from 'meteor/meteor'

const Logger = {
  log (message) {
    Meteor.call('logger.log', message)
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
    Logger.log({ message: msg, file: url, line: line })

    if (_GlobalErrorHandler) {
      _GlobalErrorHandler.apply(this, arguments)
    }
  }
})
