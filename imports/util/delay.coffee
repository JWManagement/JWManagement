export Delay = (param) ->
	Meteor.setTimeout ->
		param()
	, 0

export wrs = (param) ->
	Meteor.setTimeout ->
		FlowRouter.withReplaceState ->
			param()
	, 0
