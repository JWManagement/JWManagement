import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'

import './profileSettings.tpl.jade'

Template.profileSettings.events

	'click #changePassword': ->
		swal.withForm
			title: TAPi18n.__('swal.update.password.title')
			confirmButtonColor: '#3f51b5'
			confirmButtonText: TAPi18n.__('swal.update.password.confirm')
			cancelButtonText: TAPi18n.__('swal.update.password.cancel')
			showCancelButton: true
			closeOnConfirm: false
			formFields: [
				id: 'passwordOld'
				type: 'password'
				placeholder: TAPi18n.__('swal.update.password.passwordOld')
			,
				id: 'passwordNew1'
				type: 'password'
				placeholder: TAPi18n.__('swal.update.password.passwordNew1')
			,
				id: 'passwordNew2'
				type: 'password'
				placeholder: TAPi18n.__('swal.update.password.passwordNew2')
			]
		, (isConfirm) -> if isConfirm
			value = false
			password1 = @swalForm.passwordNew1
			password2 = @swalForm.passwordNew2

			if password1 == password2
				if password1.length >= 8
					Accounts.changePassword @swalForm.passwordOld, @swalForm.passwordNew1, (e) ->
						if e
							Dialogs.handleError e
						else
							swal TAPi18n.__('swal.update.password.passwordChanged'), '', 'success'
				else
					swal TAPi18n.__('password.tooShort'), '', 'error'
			else
				swal TAPi18n.__('password.notMatching'), '', 'error'

	'click #deleteAccount': ->
		Dialogs.swalYesNo
			swal: 'delete.account'
			type: 'error'
			doConfirm: ->
				FlowRouter.go 'home', language: TAPi18n.getLanguage()
				Meteor.users.methods.remove.call()
