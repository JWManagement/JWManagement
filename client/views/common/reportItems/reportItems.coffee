Template.reportItems.helpers

	getStorePublicationTranslation: (path) ->
		i18next.t('store.publication.' + path)

	availableItems: ->
		project = Projects.findOne FlowRouter.getParam('projectId')
		project.store.items if project? && project.store? && project.store.items?

	selectedItem: ->
		project = Projects.findOne FlowRouter.getParam('projectId')

		if project? && project.store? && project.store.items?
			for item in project.store.items
				if item.short == Session.get 'selectedItem'
					return item

Template.reportItems.events

	'change #item': (e) -> Session.set 'selectedItem', $(e.target).val()

	'click #reportAddItem': ->
		$('div').removeClass('has-error')

		if $('#item').val()?
			short = $('#item').val()

			if $('#language').val()?
				language = $('#language').val()
				count = $('#count').val()

				if isNaN parseInt count
					$('#count').closest('div').addClass('has-error')
				else
					shiftId = FlowRouter.getQueryParam('showShiftReport')
					teamId = FlowRouter.getQueryParam('reportTeamId')

					Meteor.call 'updateReportAddItem', shiftId, teamId, short, language, count, (e) -> if !e?
						$('#count').val('')
			else
				$('#language').closest('div').addClass('has-error')
		else
			$('#item').closest('div').addClass('has-error')

	'click .deleteItem': ->
		shiftId = FlowRouter.getQueryParam('showShiftReport')
		teamId = FlowRouter.getQueryParam('reportTeamId')
		short = @short
		language = @language
		count = @count

		Meteor.call 'updateReportDeleteItem', shiftId, teamId, short, language, count

Template.reportItems.onCreated ->

	Session.set 'selectedItem', ''
	Session.set 'projectId', FlowRouter.getParam('projectId')

	@autorun -> ProjectSubs.subscribe 'store', FlowRouter.getParam('projectId')
