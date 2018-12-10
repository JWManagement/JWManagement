import { Template } from 'meteor/templating'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'

function getKey () {
  return Template.instance().key
}

function getTitle () {
  return i18next.t('navigation.' + FlowRouter.getRouteName())
}

function getEntityTranslation (key, suffix) {
  if (key == null) {
    key = FlowRouter.getParam('key')
  }

  const attributeParts = [key]

  if (suffix != null && typeof (suffix) === 'string') {
    attributeParts.push(suffix)
  }

  const routeNameParts = FlowRouter.getRouteName().split('.')
  routeNameParts.pop()
  routeNameParts.splice(1, 0, 'entity')

  return i18next.t(routeNameParts.concat(attributeParts).join('.').replace(/_/g, '.'))
}

export { getKey, getTitle, getEntityTranslation }
