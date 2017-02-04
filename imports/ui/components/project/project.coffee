import './project.tpl.jade'

Template.project.helpers

	centerProject: -> 'col-lg-offset-3' if Projects.find({}, fields: _id: 1).count() == 1

	multipleTags: -> @tags.length > 1 if @tags

	getAllTagsPath: (tags) ->
		tags = tags.map (tag) -> tag._id

		FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tags.join('_')

	getTagPath: (tagId) -> FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tagId

	newsThere: -> @news?.text and @news.text != ''

	getUnderstaffedShifts: ->
		Shifts.find
			projectId: @_id
			teams:
				$elemMatch:
					participants: $eq: []
					pending: $gt: []
					status: 'open'
					min: $gt: 1
