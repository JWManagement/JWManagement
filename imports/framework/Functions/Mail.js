import { TAPi18n } from 'meteor/tap:i18n'

function getMailTexts (mail, language) {
  let values = {}

  values.headline = TAPi18n.__('mail.' + mail + '.headline', '', language)
  values.hello = TAPi18n.__('mail.' + mail + '.hello', '', language)
  values.text1 = TAPi18n.__('mail.' + mail + '.text1', '', language)
  values.text2 = TAPi18n.__('mail.' + mail + '.text2', '', language)
  values.changed = TAPi18n.__('mail.' + mail + '._changed', '', language)
  values.button = TAPi18n.__('mail.' + mail + '.button', '', language)

  return values
}

export { getMailTexts }
