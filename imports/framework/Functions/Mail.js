import i18next from 'i18next'

function getMailTexts (mail, language) {
  let values = {}
  const localTranslate = i18next.getFixedT(language)

  values.headline = localTranslate(`mail.${mail}.headline`)
  values.hello = localTranslate(`mail.${mail}.hello`)
  values.text1 = localTranslate(`mail.${mail}.text1`)
  values.text2 = localTranslate(`mail.${mail}.text2`)
  values.changed = localTranslate(`mail.${mail}._changed`)
  values.button = localTranslate(`mail.${mail}.button`)

  return values
}

export { getMailTexts }
