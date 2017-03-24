export Dialogs =

	callback: (args) -> (e, r) ->
		if e
			console.log e
			Dialogs.feedback e
			if args.onError? then args.onError e
		else if r
			if args.onSuccess? then args.onSuccess r

	feedback: (error, type) ->
		if error
			type = type || 'swal'

			if type == 'swal'
				if error.error == 'validation-error'
					swal error.reason, '', 'error'
				else
					swal TAPi18n.__('feedback.' + error.reason + '.' + error.error), '', error.reason
			else if type == 'toast'
				toastr[error.reason] '', TAPi18n.__('feedback.' + error.reason + '.' + error.error),
					closeButton: true
					debug: false
					progressBar: true
					preventDuplicates: true
					positionClass: 'toast-bottom-right'
					onclick: null
					showDuration: '400'
					hideDuration: '400'
					timeOut: '4000'
					extendedTimeOut: '1000'
					showEasing: 'swing'
					hideEasing: 'linear'
					showMethod: 'fadeIn'
					hideMethod: 'fadeOut'

	handleError: (e) -> if e?

		if e.error == 'validation-error'
			swal e.reason, '', 'error'
		else if e.error < 300
			swal 'Information', e.reason, 'info'
		else
			swal 'Error ' + e.error, e.reason, 'error'

	handleSuccess: (e) -> if !e

		# TODO: translate

		toastr.success '', 'Successfully saved',
			closeButton: false
			debug: false
			progressBar: false
			preventDuplicates: false
			positionClass: 'toast-bottom-right'
			onclick: null
			showDuration: '400'
			hideDuration: '1000'
			timeOut: '3000'
			extendedTimeOut: '500'
			showEasing: 'swing'
			hideEasing: 'linear'
			showMethod: 'fadeIn'
			hideMethod: 'fadeOut'

	swalYesNo: (attrs) ->
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

	swalInput: (attrs) ->
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

	swalClose: -> swal title: '', timer: 0
