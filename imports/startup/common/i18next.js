import { Meteor } from 'meteor/meteor'
import i18next from 'i18next'
import Backend from 'i18next-node-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import SystemLanguages from '../../framework/Constants/SystemLanguages'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: Meteor.isServer ? SystemLanguages.allowedValues : false,
    backend: {
      projectId: 'd0390b1e-95ad-4aa6-93b8-6372476039d8',
      apiKey: '5bb8eba8-deff-4a65-8a2a-fd7029d9a16b',
      referenceLng: 'en'
    }
  })
