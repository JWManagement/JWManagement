import { Template } from 'meteor/templating'
import i18next from 'i18next'
import SystemLanguages from '../../imports/framework/Constants/SystemLanguages'

Template.registerHelper('langTag', () => i18next.language)

Template.registerHelper('getLanguages', () => SystemLanguages.allowedValues)

Template.registerHelper('_', (key, options) => i18next.t(key, options))
