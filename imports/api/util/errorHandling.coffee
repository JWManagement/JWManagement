export handleValidationError = (e) ->

	if e.error == 'validation-error'
		swal(TAPi18n.__('error.' + e.reason), '', 'error')
