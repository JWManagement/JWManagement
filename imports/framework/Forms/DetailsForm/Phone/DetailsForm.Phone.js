import { Template } from 'meteor/templating'

import { getValue } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Phone.jade'

Template.DetailsFormPhone.helpers({ getValue, getEntityTranslation })

Template.DetailsFormPhone.onCreated(() => {})

Template.DetailsFormPhone.onRendered(() => {})

Template.DetailsFormPhone.onDestroyed(() => {})

Template.DetailsFormPhone.events({})
