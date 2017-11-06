import { Pictures } from '/imports/api/pictures/pictures.coffee'
import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { Delay } from '/imports/api/util/delay.coffee'
import { wrs } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import '/imports/api/resources/bootstrap-datepicker.js'

import '/imports/ui/components/modals/modal.coffee'
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
		language: FR.getLanguage()
		ignoreReadonly: true

	# TODO: what?!

Template.profile.onDestroyed ->

	Session.set 'target', undefined

Template.profile.events

	'click .profile-image': (e) -> wrs -> FlowRouter.setQueryParams editProfilePicture: true
