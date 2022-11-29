SystemLanguages = require('../../../../imports/framework/Constants/SystemLanguages.js').default

Template.uploadUserFileModal.helpers

	getExistingUsers: -> Session.get 'existingUsers'
	hasExistingUsers: -> Session.get('existingUsers')?.length > 0
	getNewUsers: -> Session.get 'newUsers'
	hasNewUsers: -> Session.get('newUsers')?.length > 0

	countUsers: ->
		users = Session.get 'users'
		if users? then users.length else 0

	addOne: (val) -> val + 1

	uploading: -> Session.get 'uploading'

Template.uploadUserFileModal.onRendered ->
	$('#uploadUserFileModal').modal('show')
	$('#uploadUserFileModal').on 'hidden.bs.modal', ->
		$('.modal-backdrop').remove()

		Session.set 'newUsers', null
		Session.set 'existingUsers', null
		if !Session.get('users')? then Session.set 'users', undefined
		if !Session.get('uploading')? then Session.set 'uploading', undefined

Template.uploadUserFileModal.events

	'click #close': ->
		FlowRouter.setQueryParams uploadUserFile: undefined

	'click #addUsers': ->
		projectId = FlowRouter.getParam('projectId')
		users = Session.get('users')
		swalYesNo
			swal: 'add.users'
			type: 'warning'
			doConfirm: -> Meteor.call 'createAccounts', users, projectId
		FlowRouter.setQueryParams uploadUserFile: undefined

	'change #uploadFile': (e) ->
		users = []

		Session.set 'uploading', true

		$(e.target).parse
			before: (file, inputElement) ->
				unless file.type in ['application/vnd.ms-excel', 'text/csv']
					swal 'Error false File format', 'File has to be a CSV-File (but is ' + file.type + ')', 'error'
					Session.set 'uploading', false
					{ action: 'abort', reason: 'file format' }
			config:
				complete: (results, parser) ->
					users = []

					for user in results.data
						email = user[0].toLowerCase().replace(/ /g,'')
						firstname = user[1]
						lastname = user[2]
						gender = user[3]
						telefon = user[4]
						pioneer = if user[5] in ['publisher', 'auxiliary', 'regular', 'special', 'circuit', 'bethelite', 'ldc'] then user[5] else 'publisher'
						privilege = if user[6] in ['publisher', 'servant', 'elder', 'coordinator', 'secretary', 'serviceOverseer'] then user[6] else 'publisher'
						congregation = user[7]
						systemLanguage = user[8]
						foreignLanguages = user[9]
						roles = user[10]
						id = user[11]

						if !SystemLanguages.allowedValues.includes(systemLanguage)
							systemLanguage = SystemLanguages.defaultValue

						if email.match(/^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i)
							users.push
								email: email
								firstname: firstname
								lastname: lastname
								gender: gender
								telefon: telefon
								pioneer: pioneer
								privilege: privilege
								congregation: congregation
								systemLanguage: systemLanguage
								foreignLanguages: foreignLanguages
								roles: roles
								id: id

					if users.length == 0
						alert 'Sorry, we couldn\'t extract any users of this file. Does the .csv-file have semicolons, maybe?'

					currentUsers = Meteor.users.find({}, fields: services: 0, 'profile.available': 0, 'profile.vacations': 0).fetch()
					Session.set 'existingUsers', users.filter((u) -> currentUsers.find((cu) -> cu._id == u.id))
					Session.set 'newUsers', users.filter((u) -> !currentUsers.find((cu) -> cu._id == u.id))

					Session.set 'users', users
					Session.set 'uploading', false
