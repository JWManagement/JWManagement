import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './signIn.html'
import './signIn.scss'

Template.signIn.helpers({
  error () {
    return Session.get('error')
  },
  onloadCallback () {
    console.log('onload')
  }
})

Template.signIn.onCreated(() => {
  if (FlowRouter.getRouteName() === 'dashboard.details') {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      return FlowRouter.go('landing', {
        language: 'en'
      })
    }
  }
})

Template.signIn.onRendered(() => {
  Session.set('error', '')
})

Template.signIn.events({
  'submit form' (event, a, b, c) {
    event.preventDefault()
    Session.set('error', '')

    const submit = $('#submit').ladda()
    submit.ladda('start')

    const usernameOrEmail = $('[name=usernameOrEmail]').val()
    const password = $('[name=password]').val()
    const captcha = grecaptcha.getResponse(0)

    if (captcha == null || captcha === '') {
      const message = 'missingCaptcha'
      submit.ladda('stop')
      Session.set('error', i18next.t(`error.${message}`))
      return
    }

    function loginWithPasswordAsync (username, pw, captcha) {
      return new Promise((resolve, reject) => {
        Meteor.call('verifyCaptcha', captcha, (error) => {
          if (error) {
            reject(error)
          } else {
            Meteor.loginWithPassword(username, pw, (error) => {
              if (error) {
                reject(error)
              } else {
                Meteor.call('setMyAccountActive')
                resolve()
              }
            })
          }
        })
      })
    }

    loginWithPasswordAsync(usernameOrEmail, password, captcha)
      .catch((error) => {
        if (error.reason === 'User not found') {
          return Meteor.callPromise('getUsernameForEmailAddress', usernameOrEmail)
            .then(username => loginWithPasswordAsync(username, password))
        }
        throw error
      })
      .catch((error) => {
        let message = 'generic'

        if (error.error === 400) {
          message = 'missingField'
        } else if (error.error === 403) {
          message = 'incorrectPassword'
        } else if (['noAccountFound', 'multipleAccountsFound'].includes(error.error)) {
          message = error.error
        } else {
          console.error(error)
        }

        submit.ladda('stop')
        Session.set('error', i18next.t(`error.${message}`))
      })
  }
})
