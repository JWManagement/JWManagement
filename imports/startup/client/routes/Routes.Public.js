import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { wrs } from '/imports/framework/Functions/Async'
import { checkLanguage, logout } from '/imports/framework/Managers/RouteManager.Helpers'

FlowRouter.notFound = {
  action: () => {
    BlazeLayout.render('blankLayout', { content: 'notFound' })
  }
}

FlowRouter.route('/:language/welcome', {
  name: 'welcome',
  triggersEnter: [ checkLanguage ],
  action: () => {
    BlazeLayout.render('blankLayout', { content: 'landing' })
  }
})

FlowRouter.route('/:language/login', {
  name: 'login',
  triggersEnter: [ checkLanguage ],
  action: () => {
    Tracker.autorun((tracker) => {
      if (Meteor.userId()) {
        wrs(() => FlowRouter.go('home'))
        tracker.stop()
      } else {
        BlazeLayout.render('blankLayout', { content: 'login' })
      }
    })
  }
})

FlowRouter.route('/:language/forgot', {
  name: 'forgotPassword',
  triggersEnter: [ checkLanguage, logout ],
  action: () => {
    Session.set('parent', 'dashboard.details')
    BlazeLayout.render('blankLayout', { content: 'forgotPassword' })
  }
})

FlowRouter.route('/:language/reset', {
  name: 'resetPassword',
  triggersEnter: [ checkLanguage, logout ],
  action: () => {
    Session.set('parent', 'dashboard.details')
    BlazeLayout.render('blankLayout', { content: 'resetPassword' })
  }
})

FlowRouter.route('/:language/firstLogin', {
  name: 'firstLogin',
  triggersEnter: [ checkLanguage, logout ],
  action: () => {
    Session.set('parent', 'dashboard.details')
    BlazeLayout.render('blankLayout', { content: 'firstLogin' })
  }
})
