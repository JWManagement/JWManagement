Template.uploadUserFileModal.helpers

	getNewUsers: -> Session.get 'newUsers'

	getExistingUsers: -> Session.get 'existingUsers'

	countNewUsers: ->
		users = Session.get 'newUsers'
		if users? then users.length else 0

	countExistingUsers: ->
		users = Session.get 'existingUsers'
		if users? then users.length else 0

	addOne: (val) -> val + 1

	uploading: -> Session.get 'uploading'

Template.uploadUserFileModal.onRendered ->

	$('#uploadUserFileModal').modal('show')
	$('#uploadUserFileModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams uploadUserFile: undefined, addUser: true
		$('.modal-backdrop').remove()

		if !Session.get('newUsers')? then Session.set 'newUsers', undefined
		if !Session.get('existingUsers')? then Session.set 'existingUsers', undefined
		if !Session.get('uploading')? then Session.set 'uploading', undefined

Template.uploadUserFileModal.events

	'click #addUsers': ->
		projectId = FlowRouter.getParam('projectId')
		newUsers = Session.get('newUsers')
		existingUsers = Session.get('existingUsers')

		swalYesNo
			swal: 'add.users'
			type: 'warning'
			doConfirm: -> Meteor.call 'createAccounts', newUsers, existingUsers, projectId

	'change #uploadFile': (e) ->
		newUsers = []
		existingUsers = []

		Session.set 'uploading', true

		$(e.target).parse
			before: (file, inputElement) ->
				unless file.type in ['application/vnd.ms-excel', 'text/csv']
					swal 'Error false File format', 'File had to be a CSV-File', 'error'
					Session.set 'uploading', false
					{ action: 'abort', reason: 'file format' }
			config:
				complete: (results, parser) ->
					emailPattern = /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i
					newUsers = []
					existingUsers = []

					for user in results.data
						email = user[0].toLowerCase()
						firstname = user[1]
						lastname = user[2]
						gender = user[3]
						telefon = user[4]
						birthday = user[5]
						pioneer = if user[6] in ['publisher', 'auxiliary', 'regular', 'special', 'circuit', 'bethelite', 'ldc'] then user[6] else 'publisher'
						privilege = if user[7] in ['publisher', 'servant', 'elder'] then user[7] else 'publisher'
						congregation = user[8]

						usersExisting = Meteor.users.find('profile.email': email, 'profile.firstname': firstname, 'profile.lastname': lastname).fetch()

						if usersExisting.length > 0
							existingUsers.push
								email: email
								firstname: firstname
								lastname: lastname
						else if email.match emailPattern
							if moment(birthday, 'DD.MM.YYYY').isValid()
								bdate = birthday
							else if moment(birthday, 'YYYY-MM-DD').isValid()
								bdate = moment(birthday, 'YYYY-MM-DD').format('DD.MM.YYYY')
							else if moment(birthday).isValid()
								moment(birthday).format('DD.MM.YYYY')
							else
								bdate = '01.01.1970'

							newUsers.push
								email: email
								firstname: firstname
								lastname: lastname
								gender: gender
								telefon: telefon
								bdate: bdate
								pioneer: pioneer
								privilege: privilege
								congregation: congregation
								language: TAPi18n.getLanguage()

					Session.set 'newUsers', newUsers
					Session.set 'existingUsers', existingUsers
					Session.set 'uploading', false
