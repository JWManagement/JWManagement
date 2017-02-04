import { Shifts } from './shifts.coffee'

export Helpers =

	shift: -> Shifts.findOne @listId
