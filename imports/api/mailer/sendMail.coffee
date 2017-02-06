import { send } from './send.coffee'
import { sendConfirmation } from './sendConfirmation.coffee'
import { sendDeclined } from './sendDeclined.coffee'
import { sendConfirmWeek } from './sendConfirmWeek.coffee'
import { sendTeamUpdate } from './sendTeamUpdate.coffee'

export SendMail =

	send: send
	sendConfirmation: sendConfirmation
	sendDeclined: sendDeclined
	sendConfirmWeek: sendConfirmWeek
	sendTeamUpdate: sendTeamUpdate
