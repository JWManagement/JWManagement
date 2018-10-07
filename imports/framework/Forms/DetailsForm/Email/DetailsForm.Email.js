import { Template } from 'meteor/templating'

import { getValue } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers'
import { getEntityTranslation } from '/imports/framework/Helpers/Helpers'

import './DetailsForm.Email.jade'

Template.DetailsFormEmail.helpers({ getValue, getEntityTranslation })

Template.DetailsFormEmail.onCreated(() => {})

Template.DetailsFormEmail.onRendered(() => {})

Template.DetailsFormEmail.onDestroyed(() => {})

Template.DetailsFormEmail.events({})
