import './understaffedShiftsList.tpl.jade'

Template.understaffedShiftsList.helpers

	hasUnderstaffedShifts: ->
		shifts = Template.currentData().shifts

		Template.currentData().shifts.length > 0 if shifts?
