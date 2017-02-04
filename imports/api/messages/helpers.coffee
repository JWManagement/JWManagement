import { Messages } from './messages.coffee'

export Helpers =

	message: -> Messages.findOne @listId
