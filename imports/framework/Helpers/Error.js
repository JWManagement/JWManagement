import { Template } from 'meteor/templating'
import i18next from 'i18next'

function isHandledError (error) {
  return ['required', 'unique', 'minString8', 'passwordMismatch', 'hasToBeBigger'].indexOf(error) > -1
}

function hasError () {
  const data = Template.currentData().data
  return isHandledError(data.error)
}

function getErrorClass () {
  const data = Template.currentData().data
  if (isHandledError(data.error)) {
    return 'has-error'
  }
  return ''
}

function getEntityErrorTranslation () {
  const data = Template.currentData().data
  if (isHandledError(data.error)) {
    return i18next.t('validation.' + data.error)
  }
  return ''
}

export { hasError, getErrorClass, getEntityErrorTranslation }
