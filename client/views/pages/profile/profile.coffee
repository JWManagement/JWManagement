Template.profile.helpers

	isField: (field, val) -> 'selected' if @profile? and @profile[field] == val

	picture: -> Pictures.findOne userId: Meteor.userId()

	isAvailable: (day, hour) ->
		if @profile.available? && Object.keys(@profile.available).length > 0
			if parseInt(hour) * 100 in @profile.available[day]
				'available'

	getVacations: ->
		if @profile.vacations?
			@profile.vacations
				.filter (v) -> v.end >= parseInt(moment(new Date).format('YYYYDDDD'))
				.sort (a, b) -> a.start - b.start

	weekdays: -> [ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su' ]

	hours: -> [0..23]

	negate: (value) -> !value

Template.profile.onRendered ->

	@autorun ->
		$('.input-daterange').datepicker
			format: 'dd.mm.yyyy'
			language: FlowRouter.getParam('language')
			ignoreReadonly: true

		$('#bdate-wrapper').datepicker
			format: 'dd.mm.yyyy'
			autoclose: true
			forceParse: false
			startDate: '1900/01/01'
			language: FlowRouter.getParam('language')

Template.profile.onRendered ->

	$('.animated').removeClass('animated').addClass('skipped')

Template.profile.onDestroyed ->

	$('#editProfilePictureModal').modal('hide')
	Session.set('target', undefined)

Template.profile.events

	'click .profile-image': (e) ->
		wrs -> FlowRouter.setQueryParams editProfilePicture: true

	'change #firstname': (e) -> Meteor.call 'updateProfile', 'firstname', e.target.value, handleSuccess

	'change #lastname': (e) -> Meteor.call 'updateProfile', 'lastname', e.target.value, handleSuccess

	'change #username': (e) -> Meteor.call 'updateProfile', 'username', e.target.value, (error) ->
		if error
			if error.error == 406
				swal TAPi18n.__('profile.usernameTaken'), '', 'error'
				Delay -> $(e.target).val Meteor.user().username
			else
				handleError error
		else
			handleSuccess error

	'change #email': (e) -> Meteor.call 'updateProfile', 'email', e.target.value, handleSuccess

	'change #telefon': (e) -> Meteor.call 'updateProfile', 'telefon', e.target.value, handleSuccess

	'change #congregation': (e) -> Meteor.call 'updateProfile', 'congregation', e.target.value, handleSuccess

	'change #gender': (e) -> Meteor.call 'updateProfile', 'gender', e.target.value, handleSuccess

	'change #languages': (e) -> Meteor.call 'updateProfile', 'languages', e.target.value, handleSuccess

	'change #bdate': (e) ->
		bdate = e.target.value

		if bdate.indexOf('Invalid') > -1
			Meteor.call 'updateProfile', 'bdate', ''
		else
			Meteor.call 'updateProfile', 'bdate', bdate, handleSuccess

	'change #pioneer': (e) -> Meteor.call 'updateProfile', 'pioneer', e.target.value, handleSuccess

	'change #privilege': (e) -> Meteor.call 'updateProfile', 'privilege', e.target.value, handleSuccess

	'change #shortTermCalls': (e) ->
		Meteor.call 'updateProfile', 'shortTermCalls', e.target.checked, handleSuccess
		if e.target.checked == false
			Meteor.call 'updateProfile', 'shortTermCallsAlways', false

	'change #shortTermCallsAlways': (e) -> Meteor.call 'updateProfile', 'shortTermCallsAlways', e.target.checked, handleSuccess

	'click #changePassword': ->
		swal.withForm
			title: TAPi18n.__('swal.update.password.title')
			confirmButtonColor: "#3f51b5"
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
						unless e then swal TAPi18n.__('swal.update.password.passwordChanged'), '', 'success'
				else
					swal TAPi18n.__('password.tooShort'), '', 'error'
			else
				swal TAPi18n.__('password.notMatching'), '', 'error'

	'click #deleteAccount': ->
		swalYesNo
			swal: 'delete.account'
			type: 'error'
			doConfirm: ->
				FlowRouter.go('dashboard')
				Meteor.call 'deleteUser', Meteor.userId()

	'click .timetable td:not(.day)': (e) ->
		day = $(e.target).parent().attr('data-day')
		hour = $(e.target).attr('data-hour') * 100

		if day? && hour?
			Meteor.call 'toggleAvailability', day, hour

	'click .delVacation': (e) -> Meteor.call 'removeVacation', @_id

	'click #addVacation': ->
		today = moment(new Date).format('YYYYDDDD')
		Meteor.call 'addVacation', today, (err, vacationId) -> Tracker.afterFlush ->
			$('#' + vacationId).datepicker
				format: 'dd.mm.yyyy'
				language: FlowRouter.getParam('language')

	'change .startDate': (e) -> Meteor.call 'setVacationStart', @_id, e.target.value

	'change .endDate': (e) ->
		if moment(e.target.value, 'DD.MM.YYYY') < moment(0, 'HH')
			swal TAPi18n.__('swal.vacationEndInPast'), '', 'error'
		else
			Meteor.call 'setVacationEnd', @_id, e.target.value
