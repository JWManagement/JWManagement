import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { FlowRouter } from 'meteor/kadira:flow-router'
import i18next from 'i18next'
import moment from 'moment'
import { wrs } from '../../framework/Functions/Async'

export { setLanguageOnAuth }

Meteor.startup(setLanguageOnAuth)

function setLanguageOnAuth () {
  moment.locale('en-US') // default

  Tracker.autorun((tracker) => {
    if (Meteor.user() != null) {
      tracker.stop()

      const language = FlowRouter.current().params.language
      const myLanguage = Meteor.user().profile.language

      if (language !== myLanguage) {
        wrs(() => FlowRouter.setParams({ language: myLanguage }))
      }

      if (moment.locale() !== myLanguage) {
        moment.locale(myLanguage)
      }

      if (i18next.language !== myLanguage) {
        i18next.changeLanguage(myLanguage)
      }
    }
  })
}
