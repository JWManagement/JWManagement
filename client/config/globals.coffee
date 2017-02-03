@handleError = (e) -> if e?
	if e.error == 'error'
		swal e.reason, '', 'error'
	else if e.error < 300
		swal 'Information', e.reason, 'info'
	else
		swal 'Error ' + e.error, e.reason, 'error'

@handleSuccess = (e) -> if !e
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
