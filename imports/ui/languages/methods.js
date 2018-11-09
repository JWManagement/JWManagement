import { Meteor } from 'meteor/meteor'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'
import moment from 'moment'

Meteor.methods({
  'language.update' (_, __, language) {
    const userId = Meteor.userId()

    Meteor.users.update(userId, {
      $set: {
        'profile.language': language
      }
    })

    i18next.changeLanguage(language)
    moment.locale(language)

    FlowRouter.withReplaceState(() => {
      FlowRouter.setParams({ language: language })
    })
  }
})
