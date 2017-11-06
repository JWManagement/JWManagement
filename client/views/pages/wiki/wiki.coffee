Template.wiki.helpers

	route: ->
		name: TAPi18n.__('wiki.name')
		parent: FlowRouter.path 'document', docId: FlowRouter.getParam('docId')

	tabs: ->
		project = Projects.findOne FlowRouter.getParam('projectId')
		project?.wiki?.tabs

	files: ->
		projectId = FlowRouter.getParam('projectId')
		Files.find projectId: projectId

	projectId: -> FlowRouter.getParam('projectId')

	isReady: -> ProjectSubs.ready()

Template.wiki.onRendered ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		handle = ProjectSubs.subscribe 'wiki', projectId
		handle.ready Tracker.afterFlush ->
			$('.nav-tabs > li').removeClass('active')
			$('.nav-tabs > li:first').addClass('active')
			$('.tab-content .tab-pane:first').addClass('active')

			$('.summernote').summernote()
			$('.note-editor').addClass('hidden')

		FileSubs.subscribe 'files', projectId

Template.wiki.events

	'click .addTab': ->
		projectId = FlowRouter.getParam('projectId')

		swalInput
			swal: 'add.tab'
			doConfirm: (inputValue) -> Meteor.call 'addTab', projectId, inputValue

	'click .removeTab': (e) ->
		tabId = @_id

		swalYesNo
			swal: 'delete.tab'
			type: 'warning'
			doConfirm: ->
				Meteor.call 'removeTab', FlowRouter.getParam('projectId'), tabId, ->
					$('.nav-tabs li').first().addClass('active')
					$('.tab-content .tab-pane').first().addClass('active')

	'click .editTab': (e) ->
		tabId = @_id

		$('#'+tabId+'b .tab-title').addClass('hidden')
		$('#'+tabId+'b .tab-edit').removeClass('hidden')
		$('#'+tabId+'b .changeTab').focus()

	'blur .changeTab': (e) ->
		tabId = @_id

		$('#'+tabId+'b .tab-edit').addClass('hidden')
		$('#'+tabId+'b .tab-title').removeClass('hidden')

	'change .changeTab': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tabId = @_id

		Meteor.call 'changeTab', projectId, tabId, $(e.target).val()

	'click .addQuestion': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tabId = @_id

		swalInput
			swal: 'add.question'
			doConfirm: (inputValue) ->
				Meteor.call 'addQuestion', projectId, inputValue, tabId, (err, faqId) ->
					Tracker.afterFlush ->
						$('#'+faqId).find('.summernote').summernote()
						$('.note-editor').addClass('hidden')

	'click .editFaq': (e) ->
		faq = $(e.target).closest('.faq-item')

		faq.find('.panel-collapse').addClass 'in'
		faq.find('.note-editor').removeClass 'hidden'
		faq.find('.editor-btn').removeClass 'hidden'
		faq.find('.content').addClass 'hidden'
		faq.find('.editFaq').addClass 'hidden'

	'click .changeFaq': (e) ->
		tabId = $(e.target).closest('.tab-pane').attr('id')
		faqId = @_id
		faq = $(e.target).closest('.faq-item')
		code = faq.find('.summernote').summernote('code')

		Meteor.call 'changeFaq', FlowRouter.getParam('projectId'), tabId, faqId, code, ->
			faq.find('.note-editor').addClass 'hidden'
			faq.find('.editor-btn').addClass 'hidden'
			faq.find('.content').removeClass 'hidden'
			faq.find('.editFaq').removeClass 'hidden'

	'click .cancelFaq': (e) ->
		faq = $(e.target).closest('.faq-item')

		faq.find('.note-editor').addClass 'hidden'
		faq.find('.editor-btn').addClass 'hidden'
		faq.find('.content').removeClass 'hidden'
		faq.find('.editFaq').removeClass 'hidden'

	'click .removeFaq': (e) ->
		projectId = FlowRouter.getParam('projectId')
		faqId = @_id

		swalYesNo
			swal: 'delete.question'
			type: 'warning'
			doConfirm: ->
				tabId = $(e.target).closest('.tab-pane').attr('id')
				Meteor.call 'removeFaq', projectId, tabId, faqId

	'click .editQuestion': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tabId = $(e.target).closest('.tab-pane').attr('id')
		faqId = @_id

		swalInput
			swal: 'update.question'
			doConfirm: (inputValue) ->
				Meteor.call 'changeQuestion', projectId, tabId, faqId, inputValue

	'change #uploadFile': (e) ->
		if e.target.files.length > 0
			doc = new FS.File e.target.files[0]
			doc.projectId = FlowRouter.getParam('projectId')

			Files.insert doc, handleError

	'click .removeFile': (e) ->
		projectId = FlowRouter.getParam('projectId')
		fileId = @_id

		swalYesNo
			swal: 'delete.file'
			type: 'warning'
			doConfirm: -> Meteor.call 'removeFile', fileId, projectId

	'click .editFile': ->
		projectId = FlowRouter.getParam('projectId')
		fileId = @_id
		name = @name

		swalInput
			swal: 'update.file'
			doConfirm: (inputValue) ->
				Meteor.call 'changeFileName', fileId, projectId, inputValue
