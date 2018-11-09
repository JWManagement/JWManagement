import i18next from 'i18next'

function getMailTexts (mail, language) {
  let values = {}

  values.headline = i18next.t('mail.' + mail + '.headline', '', language)
  values.hello = i18next.t('mail.' + mail + '.hello', '', language)
  values.text1 = i18next.t('mail.' + mail + '.text1', '', language)
  values.text2 = i18next.t('mail.' + mail + '.text2', '', language)
  values.changed = i18next.t('mail.' + mail + '._changed', '', language)
  values.button = i18next.t('mail.' + mail + '.button', '', language)

  return values
}

export { getMailTexts }
