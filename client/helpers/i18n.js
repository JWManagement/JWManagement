import { Template } from 'meteor/templating'
import i18next from 'i18next'
import SystemLanguages from '../../imports/framework/Constants/SystemLanguages'

Template.registerHelper('langTag', () => i18next.language)

Template.registerHelper('getLanguages', () => SystemLanguages.allowedValues)

Template.registerHelper('_', (key, options) => {
  console.log(options)
  if (typeof options === 'string') {
    options = { param: options }
  } else if (typeof options === 'number') {
    options = { count: options }
  }

  return i18next.t(key, options)
})
