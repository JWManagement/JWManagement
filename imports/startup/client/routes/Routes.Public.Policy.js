import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

FlowRouter.route('/privacy', {
  name: 'privacy',
  action: () => {
    return BlazeLayout.render('blankLayout', { content: 'privacy' })
  }
})

FlowRouter.route('/terms', {
  name: 'terms',
  action: () => {
    BlazeLayout.render('blankLayout', { content: 'terms' })
  }
})
