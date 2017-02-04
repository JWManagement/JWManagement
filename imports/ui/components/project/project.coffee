import './project.tpl.jade'

import '/imports/ui/components/understaffedShiftsList/understaffedShiftsList.coffee'

Template.project.helpers

	getProject: -> Template.currentData().project

	centerProject: -> 'col-lg-offset-3' if Projects.find({}, fields: _id: 1).count() == 1

	multipleTags: -> @tags.length > 1 if @tags

	getAllTagsPath: (tags) ->
		tags = tags.map (tag) -> tag._id

		FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tags.join('_')

	getTagPath: (tagId) -> FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tagId

	newsThere: -> @news?.text && @news.text != ''

	understaffedShifts: -> Template.currentData().understaffedShifts
