import { send } from './send.coffee'
import { sendConfirmation } from './mails/sendConfirmation.coffee'
import { sendDeclined } from './mails/sendDeclined.coffee'
import { sendConfirmWeek } from './mails/sendConfirmWeek.coffee'
import { sendTeamUpdate } from './mails/sendTeamUpdate.coffee'

export SendMail =

	send: send
	sendConfirmation: sendConfirmation
	sendDeclined: sendDeclined
	sendConfirmWeek: sendConfirmWeek
	sendTeamUpdate: sendTeamUpdate
