import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { wrs } from '../../../framework/Functions/Async'
import { doIfLoggedIn } from '../../../framework/Managers/RouteManager.Helpers'
import { setLanguageOnAuth } from '../language'

FlowRouter.route('/profile', {
  name: 'profile',
  action () {
    doIfLoggedIn(() => {
      Session.set('target', null)
      Session.set('parent', 'dashboard.details')
      BlazeLayout.render('mainLayout', { content: 'profile' })
    })
  }
})

FlowRouter.route('/logout', {
  name: 'logout',
  action () {
    BlazeLayout.render('blankLayout', { content: 'logout' })

    Meteor.logout(() => {
      setLanguageOnAuth()
      wrs(() => FlowRouter.go('dashboard.details'))
    })
  }
})
