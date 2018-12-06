import i18next from 'i18next'

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
	title = i18next.t('swal.' + attrs.swal + '.title')
	text = i18next.t('swal.' + attrs.swal + '.text')
	confirm = i18next.t('swal.' + attrs.swal + '.confirm')
	cancel = i18next.t('swal.' + attrs.swal + '.cancel')

	type = attrs.type || 'warning'
	doConfirm = attrs.doConfirm || ->
	doCancel = attrs.doCancel || ->
	close = attrs.close
	close = true unless close?

	color = '#3f51b5'
	color = '#f44336' if type in ['error', 'warning']

	if attrs.textAttr2?
		text = i18next.t('swal.' + attrs.swal + '.text', 0: attrs.textAttr1, 1: attrs.textAttr2)
	else if attrs.textAttr1?
		text = i18next.t('swal.' + attrs.swal + '.text', 0: attrs.textAttr1)

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
	title = i18next.t('swal.' + attrs.swal + '.title')
	text = i18next.t('swal.' + attrs.swal + '.text')
	confirm = i18next.t('swal.' + attrs.swal + '.confirm')
	cancel = i18next.t('swal.' + attrs.swal + '.cancel')
	placeholder = ''
	inputError = ''
	closeOnSuccess = true
	defaultValue = attrs.defaultValue || ''
	checkInput = attrs.checkInput || ''
	doConfirm = attrs.doConfirm || ->

	if attrs.closeOnSuccess?
		closeOnSuccess = attrs.closeOnSuccess

	if checkInput
		placeholder = i18next.t('swal.' + attrs.swal + '.placeholder', { 0: checkInput })
		inputError = i18next.t('swal.' + attrs.swal + '.inputError', { 0: checkInput })
	else
		placeholder = i18next.t('swal.' + attrs.swal + '.placeholder')
		inputError = i18next.t('swal.' + attrs.swal + '.inputError')

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

@getMailTexts = (mail, localTranslate) ->
	values = {}
	values.headline = localTranslate('mail.' + mail + '.headline')
	values.hello = localTranslate('mail.' + mail + '.hello')
	values.text1 = localTranslate('mail.' + mail + '.text1')
	values.text2 = localTranslate('mail.' + mail + '.text2')
	values.changed = localTranslate('mail.' + mail + '._changed')
	values.button = localTranslate('mail.' + mail + '.button')
	values
