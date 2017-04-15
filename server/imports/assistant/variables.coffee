export R =

	init: ->
		R.allShifts = []
		R.shifts = []
		R.teams = []
		R.users = {}
		R.doneWaypoints = []
		R.savedWaypointsToMin = []
		R.savedWaypointsToMax = []
		R.finalWaypointsToMax = []
		R.count = 0
