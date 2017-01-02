initDone = false

Template.users.helpers

	allMails: ->
		mails = []
		projectId = FlowRouter.getParam('projectId')
		users = Roles.getUsersInRole Permissions.member, projectId,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1

		for user in users.fetch()
			mails.push user.profile.firstname + ' ' + user.profile.lastname + ' <' + user.profile.email + '>'

		mails.join ','

Template.users.onCreated ->

	self = this
	projectId = FlowRouter.getParam('projectId')

	drawUserlist = -> if initDone
		Tracker.afterFlush ->
			users = Roles.getUsersInRole Permissions.member, projectId,
				fields: profile: 1, username: 1
				sort: 'profile.lastname': 1, 'profile.firstname': 1

			if users.count() > 1
				columns = [
					{ name: 'id', title: '', breakpoints: '', filterable: false }
					{ name: 'firstname', title: TAPi18n.__('input.firstname'), breakpoints: '' }
					{ name: 'lastname', title: TAPi18n.__('input.lastname'), breakpoints: '' }
					{ name: 'username', title: TAPi18n.__('input.username'), breakpoints: 'all' }
					{ name: 'email', title: TAPi18n.__('input.email'), breakpoints: 'xs' }
					{ name: 'telefon', title: TAPi18n.__('input.telefon'), breakpoints: 'xs sm' }
					{ name: 'congregation', title: TAPi18n.__('input.congregation'), breakpoints: 'xs sm' }
					{ name: 'languages', title: TAPi18n.__('input.languages'), breakpoints: 'all' }
					{ name: 'gender', title: TAPi18n.__('input.gender'), breakpoints: 'all' }
					{ name: 'pioneer', title: TAPi18n.__('profile.privilegeOfService'), breakpoints: 'all' }
					{ name: 'privilege', title: TAPi18n.__('profile.ministryPrivilege'), breakpoints: 'all' }
				]

				rows = []

				for user, index in users.fetch()
					rows.push
						id: index + 1
						firstname: user.profile.firstname
						lastname: user.profile.lastname
						username: user.username
						email: user.profile.email
						telefon: user.profile.telefon
						congregation: user.profile.congregation
						languages: user.profile.languages || '-'
						gender: {
							m: TAPi18n.__('profile._gender.brother')
							w: TAPi18n.__('profile._gender.sister')
						}[user.profile.gender] || TAPi18n.__('profile._gender.brother')
						pioneer: {
							auxiliary: TAPi18n.__('profile._privilegeOfService.auxiliaryPioneer')
							regular: TAPi18n.__('profile._privilegeOfService.pioneer')
							special: TAPi18n.__('profile._privilegeOfService.specialPioneer')
							circuit: TAPi18n.__('profile._privilegeOfService.circuitOverseer')
							bethelite: TAPi18n.__('profile._privilegeOfService.bethelite')
							ldc: TAPi18n.__('profile._privilegeOfService.fulltimeConstructionServant')
						}[user.profile.pioneer] || TAPi18n.__('profile.publisher')
						privilege: {
							servant: TAPi18n.__('profile._ministryPrivilege.ministerialServant')
							elder: TAPi18n.__('profile._ministryPrivilege.elder')
						}[user.profile.privilege] || TAPi18n.__('profile.publisher')

				$('#userTable').html('').footable
					columns: columns
					rows: rows
					paging:
						enabled: true
						size: 15
					sorting:
						enabled: true
					filtering:
						enabled: true
						delay: 400
						placeholder: TAPi18n.__('users.search')
					state:
						enabled: true
						key: 'userTable'
					editing:
						enabled: true
						alwaysShow: true
						allowAdd: false
						editRow: (row) ->
							wrs -> FlowRouter.setQueryParams editUser: row.value.username
						deleteRow: (row) ->
							projectId = FlowRouter.getParam('projectId')
							username = row.value.username

							swalYesNo
								swal: 'delete.user'
								type: 'warning'
								close: false
								doConfirm: ->
									Meteor.call 'removeUserFromProject', projectId, username, (e) ->
										if e
											swal e.reason, '', 'error'
										else
											swal TAPi18n.__('users.deleted'), '', 'success'

	@autorun ->
		handle = UserSubs.subscribe 'usersByProject', projectId
		if handle.ready()
			Meteor.users.find().observe
				added: drawUserlist
				changed: drawUserlist
				removed: drawUserlist

			initDone = true

			drawUserlist()

Template.users.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.users.onDestroyed ->

	$('#addUserModal').modal('hide')
	$('#editPermissionsModal').modal('hide')
	$('#inviteUserModal').modal('hide')
	$('#uploadUserFileModal').modal('hide')

Template.users.events

	'click #addNewUser': ->
		wrs -> FlowRouter.setQueryParams addUser: true

	'click #inviteUser': ->
		wrs -> FlowRouter.setQueryParams inviteUser: true
