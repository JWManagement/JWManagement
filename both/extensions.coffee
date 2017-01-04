@Delay = (param) ->
	Meteor.setTimeout ->
		param()
	, 0

@wrs = (param) ->
	Meteor.setTimeout ->
		FlowRouter.withReplaceState ->
			param()
	, 0

@GetGroupsForUser = (userId, roles) ->
	array = []

	for role in roles
		newGroups = Roles.getGroupsForUser userId, role
		array = array.concat newGroups

	array

@swalYesNo = (attrs) ->
	title = TAPi18n.__('swal.' + attrs.swal + '.title')
	text = TAPi18n.__('swal.' + attrs.swal + '.text')
	confirm = TAPi18n.__('swal.' + attrs.swal + '.confirm')
	cancel = TAPi18n.__('swal.' + attrs.swal + '.cancel')

	type = attrs.type || 'warning'
	doConfirm = attrs.doConfirm || ->
	doCancel = attrs.doCancel || ->
	close = attrs.close
	close = true unless close?

	color = '#3f51b5'
	color = '#f44336' if type in ['error', 'warning']

	if attrs.textAttr2?
		text = TAPi18n.__('swal.' + attrs.swal + '.text', attr1: attrs.textAttr1, attr2: attrs.textAttr2)
	else if attrs.textAttr1?
		text = TAPi18n.__('swal.' + attrs.swal + '.text', attr1: attrs.textAttr1)

	swal
		title: title
		text: text
		type: type
		confirmButtonColor: color
		confirmButtonText: confirm
		cancelButtonText: cancel
		showCancelButton: true
		closeOnConfirm: close
	, (isConfirm) ->
		if isConfirm
			doConfirm()
		else
			doCancel()

@swalInput = (attrs) ->
	title = TAPi18n.__('swal.' + attrs.swal + '.title')
	text = TAPi18n.__('swal.' + attrs.swal + '.text')
	confirm = TAPi18n.__('swal.' + attrs.swal + '.confirm')
	cancel = TAPi18n.__('swal.' + attrs.swal + '.cancel')
	placeholder = ''
	inputError = ''
	closeOnSuccess = true
	defaultValue = attrs.defaultValue || ''
	checkInput = attrs.checkInput || ''
	doConfirm = attrs.doConfirm || ->

	if attrs.closeOnSuccess?
		closeOnSuccess = attrs.closeOnSuccess

	if checkInput
		placeholder = TAPi18n.__('swal.' + attrs.swal + '.placeholder', checkInput)
		inputError = TAPi18n.__('swal.' + attrs.swal + '.inputError', checkInput)
	else
		placeholder = TAPi18n.__('swal.' + attrs.swal + '.placeholder')
		inputError = TAPi18n.__('swal.' + attrs.swal + '.inputError')

	swal
		title: title
		text: text
		type: 'input'
		html: true
		inputValue: defaultValue
		inputPlaceholder: placeholder
		confirmButtonColor: '#3f51b5'
		confirmButtonText: confirm
		cancelButtonText: cancel
		showCancelButton: true
		closeOnConfirm: false
	, (inputValue) ->
		if inputValue == false
			false
		else if inputValue == ''
			swal.showInputError(inputError)
			false
		else if checkInput != '' && inputValue != checkInput
			swal.showInputError(inputError)
			false
		else
			swalClose() if closeOnSuccess
			doConfirm(inputValue)

@swalClose = -> swal title: '', timer: 0

@getMailTexts = (mail, language) ->
	values = {}
	values.headline = TAPi18n.__('mail.' + mail + '.headline', '', language)
	values.hello = TAPi18n.__('mail.' + mail + '.hello', '', language)
	values.text1 = TAPi18n.__('mail.' + mail + '.text1', '', language)
	values.text2 = TAPi18n.__('mail.' + mail + '.text2', '', language)
	values.changed = TAPi18n.__('mail.' + mail + '._changed', '', language)
	values.button = TAPi18n.__('mail.' + mail + '.button', '', language)
	values
