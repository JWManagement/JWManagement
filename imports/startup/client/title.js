import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { FlowRouter } from 'meteor/kadira:flow-router'
import i18next from 'i18next'

export { updateTitle }

Tracker.autorun(updateTitle)

function updateTitle () {
  const routeName = FlowRouter.getRouteName()
  let title = i18next.t('navigation.' + routeName)

  document.title = title + ' | JW Management'

  $('body').attr('page', routeName)
}

i18next.init({}, () => {
  if (Meteor.isClient) {
    updateTitle()
  }
})
