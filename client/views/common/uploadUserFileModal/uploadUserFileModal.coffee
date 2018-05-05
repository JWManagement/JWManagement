Template.uploadUserFileModal.helpers

	getUsers: -> Session.get 'users'

	countUsers: ->
		users = Session.get 'users'
		if users? then users.length else 0

	addOne: (val) -> val + 1

	uploading: -> Session.get 'uploading'

Template.uploadUserFileModal.onRendered ->

	$('#uploadUserFileModal').modal('show')
	$('#uploadUserFileModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams uploadUserFile: undefined, addUser: true
		$('.modal-backdrop').remove()

		if !Session.get('users')? then Session.set 'users', undefined
		if !Session.get('uploading')? then Session.set 'uploading', undefined

Template.uploadUserFileModal.events

	'click #addUsers': ->
		projectId = FlowRouter.getParam('projectId')
		users = Session.get('users')

		swalYesNo
			swal: 'add.users'
			type: 'warning'
			doConfirm: -> Meteor.call 'createAccounts', users, projectId

	'change #uploadFile': (e) ->
		users = []

		Session.set 'uploading', true

		$(e.target).parse
			before: (file, inputElement) ->
				unless file.type in ['application/vnd.ms-excel', 'text/csv']
					swal 'Error false File format', 'File has to be a CSV-File', 'error'
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
								language: TAPi18n.getLanguage()

					Session.set 'users', users
					Session.set 'uploading', false
