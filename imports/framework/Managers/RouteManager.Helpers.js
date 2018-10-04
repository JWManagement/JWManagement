import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import moment from 'moment'

import { Delay, wrs } from '/imports/framework/Functions/Async'
import { setLanguageOnAuth } from '../../startup/client/language'

const checkLanguage = function () {
  const language = FlowRouter.current().params.language
  const myLanguage = TAPi18n.getLanguage()

  if (language !== myLanguage) {
    TAPi18n.setLanguage(language)
    moment.locale(language)

    wrs(() => FlowRouter.setParams({ language: language }))
  }
}

const doIfLoggedIn = function (whatToDo, elseToDo) {
  const route = FlowRouter.getRouteName()

  Tracker.autorun((tracker) => {
    if (route !== FlowRouter.getRouteName()) {
      tracker.stop()
    } else if (Meteor.loggingIn()) {
      BlazeLayout.render('blankLayout', { content: 'loading' })
    } else if (Meteor.userId()) {
      whatToDo()
    } else if (elseToDo !== null) {
      elseToDo()
    } else {
      BlazeLayout.render('blankLayout', { content: 'login' })
    }
  })
}

const logout = function () {
  if (Meteor.loggingIn() || Meteor.userId()) {
    Delay(() => Meteor.logout(setLanguageOnAuth))
  }
}

export { checkLanguage, doIfLoggedIn, logout }
