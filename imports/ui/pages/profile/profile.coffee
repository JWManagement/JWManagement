import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { wrs } from '/imports/util/delay.coffee'

import '/imports/api/resources/bootstrap-datepicker.js'

import '/imports/ui/components/editProfilePictureModal/editProfilePictureModal.coffee'
import '/imports/ui/components/profileDetails/profileDetails.coffee'
import '/imports/ui/components/profileSettings/profileSettings.coffee'
import '/imports/ui/components/profileAvailability/profileAvailability.coffee'
import '/imports/ui/components/profileHoliday/profileHoliday.coffee'

import './profile.tpl.jade'
import './profile.scss'

Template.profile.helpers

	picture: -> Pictures.findOne userId: Meteor.userId()

Template.profile.onRendered ->

	$('.input-daterange').datepicker
		format: 'dd.mm.yyyy'
		language: FlowRouter.getParam('language')
		ignoreReadonly: true

Template.profile.onDestroyed ->

	Session.set 'target', undefined

Template.profile.events

	'click .profile-image': (e) -> wrs -> FlowRouter.setQueryParams editProfilePicture: true
