import { Template } from 'meteor/templating'
import i18next from 'i18next'
import SystemLanguages from '../../imports/framework/Constants/SystemLanguages'

Template.registerHelper('langTag', () => i18next.language)

Template.registerHelper('getLanguages', () => SystemLanguages.allowedValues)

Template.registerHelper('_', (key, ...params) => {
  let options = params.reduce((opts, value, index) => {
    opts[index] = value
    return opts
  }, {})

  if (typeof params[0] === 'number') {
    options['count'] = params[0]
  }

  return i18next.t(key, options)
})
