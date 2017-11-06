import { send } from './send.coffee'
import { sendCancelTeam } from './mails/sendCancelTeam.coffee'
import { sendConfirmation } from './mails/sendConfirmation.coffee'
import { sendConfirmWeek } from './mails/sendConfirmWeek.coffee'
import { sendDeclined } from './mails/sendDeclined.coffee'
import { sendInvitationMails } from './mails/sendInvitationMails.coffee'
import { sendJoinProject } from './mails/sendJoinProject.coffee'
import { sendMessage } from './mails/sendMessage.coffee'
import { sendResetPassword } from './mails/sendResetPassword.coffee'
import { sendReversal } from './mails/sendReversal.coffee'
import { sendTeamUpdate } from './mails/sendTeamUpdate.coffee'
import { sendToOrga } from './mails/sendToOrga.coffee'
import { sendUnderstaffed } from './mails/sendUnderstaffed.coffee'

export SendMail =

	send: send
	sendCancelTeam: sendCancelTeam
	sendConfirmation: sendConfirmation
	sendConfirmWeek: sendConfirmWeek
	sendDeclined: sendDeclined
	sendInvitationMails: sendInvitationMails
	sendJoinProject: sendJoinProject
	sendMessage: sendMessage
	sendResetPassword: sendResetPassword
	sendReversal: sendReversal
	sendTeamUpdate: sendTeamUpdate
	sendToOrga: sendToOrga
	sendUnderstaffed: sendUnderstaffed
