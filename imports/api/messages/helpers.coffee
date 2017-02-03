import { Messages } from '/imports/api/messages/messages.coffee'

export Helpers =

	message: -> Messages.findOne @listId
