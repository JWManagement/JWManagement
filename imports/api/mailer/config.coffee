import { Mailer } from 'meteor/lookback:emails'

Mailer.config

	from: 'JWManagement <no-reply@jwmanagement.org>'
	addRoutes: false
	language: 'html'
	plainTextOpts:
		ignoreImage: true
		ignoreHref: false

Mailer.init

	helpers: rootUrl: Meteor.absoluteUrl()

	layout:

		name: "emailLayout"
		path: "layout.html"
		css: "layout.css"

	templates:

		confirmation:
			path: "confirmation/confirmation.html"
			route:
				path: "/confirmation"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					datetime: "Montag, 31.01.2028 von 10:00 bis 12:00 Uhr"
					shift:
						teams: [
							name: "Innenstadt"
							participants: [
								name: "Marvin Zeising"
								phone: "1234567890"
								thisTeamleader: true
							,
								name: "Max Mustermann"
								phone: "1234567890"
								thisTeamleader: false
							]
						,
							name: "Bezirk 13"
							participants: [
								name: "Marvin Zeising"
								phone: "1234567890"
								thisTeamleader: true
							,
								name: "Max Mustermann"
								phone: "1234567890"
								thisTeamleader: false
							]
						]
					content:
						headline: "Du wurdest zugeteilt!"
						hello: "Hallo"
						text1: "du wurdest folgender Schicht zugeteilt:"

		declined:
			path: "declined/declined.html"
			route:
				path: "/declined"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					datetime: "Montag, 31.01.2028 von 10:00 bis 12:00 Uhr"
					content:
						headline: "Bewerbung leider nicht berücksichtigt"
						hello: "Hallo"
						text1: "deine Bewerbung auf folgende Schicht konnte leider nicht berücksichtigt werden:"
						text2: "Vielen Dank für deine Bewerbung!"

		reversal:
			path: "reversal/reversal.html"
			route:
				path: "/reversal"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					datetime: "Montag, 31.01.2028 von 10:00 bis 12:00 Uhr"
					team: "Innenstadt"
					content:
						hello: "Hallo"
						text1: "hiermit bestätigen wir, dass du aus folgendem Team ausgetragen wurdest:"

		teamUpdate:
			path: "teamUpdate/teamUpdate.html"
			route:
				path: "/teamUpdate"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					type: "Ein Teilnehmer"
					datetime: "Montag, 31.01.2028 von 10:00 bis 12:00 Uhr"
					shift:
						teams: [
							name: "Innenstadt"
							participants: [
								name: "Marvin Zeising"
								phone: "1234567890"
								thisTeamleader: true
							,
								name: "Max Mustermann"
								phone: "1234567890"
								thisTeamleader: false
							]
						]
					content:
						hello: "Hallo"
						text1: "da du als Teammitglied oder Teamleiter eingetragen bist, möchten wir dich über Änderungen deines Teams informieren."
						text2: "Im Folgenden findest du die aktuellen Daten des Teams:"
						changed: "hat sich geändert."

		understaffed:
			path: "understaffed/understaffed.html"
			route:
				path: "/understaffed"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					type: "Teamleiter"
					datetime: "Montag, 31.01.2028 von 10:00 bis 12:00 Uhr"
					content:
						headline: "Team ist unterbelegt"
						hello: "Hallo"
						text1: "das folgende Team ist unterbelegt und benötigt noch einen"
						text2: "Schau doch bitte nach, ob es dir möglich wäre, einzuspringen."

		teamCancellation:
			path: "teamCancellation/teamCancellation.html"
			route:
				path: "/teamCancellation"
				data: ->
					project: "Wuppertrolley"
					team: "Innenstadt"
					name: "Tim Antkowiak"
					text: "leider müssen wir dir mitteilen, dass dein Teameinsatz am <b>01.01.2099</b> um <b>10:00 - 12:00</b> Uhr <u>abgesagt</u> wurde."
					reason: "Der Regen ist einfach zu stark"
					content:
						headline: "Team musste leider abgesagt werden."
						hello: "Hallo"

		toOrga:
			path: "toOrga/toOrga.html"
			route:
				path: "/toOrga"
				data: ->
					project: "Wuppertrolley"
					text: "das Team <b>\"Innenstadt\"</b> am <b>01.01.2099</b> um <b>10:00 - 12:00</b> Uhr wurde <u>abgesagt</u>."
					content:
						hello: "Hallo Organisations-Team"

		resetPassword:
			path: "resetPassword/resetPassword.html"
			route:
				path: "/resetPassword"
				data: ->
					token: "287zrp98wjf0qzw40tf"
					language: "de"
					content:
						headline: "Passwort zurücksetzen"
						text1: "Hallo,<br>Bitte klicke auf den folgenden Button, um ein neues Passwort zu vergeben:"
						button: "Passwort zurücksetzen"
						text2: "<p>Tipps für sichere Passwörter findest du im g01 22. 6. S.31</p><p>Wenn du das Zurücksetzen deines Passwortes nicht angefordert hast, lösche diese E-Mail bitte.</p>"

		joinProject:
			path: "joinProject/joinProject.html"
			route:
				path: "/joinProject"
				data: ->
					project: "Wuppertrolley"
					name: "Tim Antkowiak"
					content:
						headline: "Du wurdest zu einem Projekt hinzugefügt"
						hello: "Hallo"
						text1: "du wurdest zu folgendem Projekt eingeladen:"
						text2: 'Du findest das Projekt jetzt auf der Übersichtsseite unter "Meine Projekte".<br><br> Viel Freude!'

		accountCreated:
			path: "accountCreated/accountCreated.html"
			route:
				path: "/accountCreated"
				data: ->
					token: "287zrp98wjf0qzw40tf"
					project: "NeanderTrolley"
					name: "Tim Antkowiak"
					content:
						headline: "Herzlich Willkommen!"
						hello: "Hallo"
						text1: "wir möchten dir mitteilen, dass wir für dich in JWManagement ein Konto angelegt haben. Um dich anzumelden, musst du einen Benutzernamen und ein Passwort hinterlegen. Klicke dazu einfach auf den Button unten."
						text2: "Bei Problemen kannst du dich gerne an uns wenden. <br> Wir wünschen dir viel Freude mit JWManagement. <br> Deine Brüder von JWManagement"
						button: "Los geht's!"
