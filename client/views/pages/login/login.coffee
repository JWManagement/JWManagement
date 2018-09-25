Template.login.helpers

  error: -> Session.get 'error'

Template.login.onCreated ->

  if FlowRouter.getRouteName() == 'dashboard.details'
    if !Meteor.userId() && !Meteor.loggingIn()
      FlowRouter.go('welcome', { language: 'en' });

Template.login.onRendered ->

  Session.set 'error', ''

Template.login.events

  'submit form': (event) ->
    event.preventDefault()
    Session.set 'error', ''

    submit = $('#submit').ladda()
    submit.ladda('start')

    usernameOrEmail = $('#usernameOrEmail').val()
    password = $('#password').val()

    if usernameOrEmail != '' && password != ''
      Meteor.loginWithPassword usernameOrEmail, password, (error1) ->
        if error1
          Meteor.call 'getUsernameForEmailAddress', usernameOrEmail, (error2, username) ->
            if error2
              Meteor.setTimeout ->
                submit.ladda('stop')
                Session.set 'error', error2.reason
              , 500
            else
              Meteor.loginWithPassword username, password, (error3) ->
                if error3
                  Meteor.setTimeout ->
                    submit.ladda('stop')
                    Session.set 'error', error3.reason
                  , 500
                else
                  language = Meteor.user().profile.language

                  if language? && TAPi18n.getLanguage() != language
                    wrs -> FlowRouter.setParams language: language
        else
          language = Meteor.user().profile.language

          if language? && TAPi18n.getLanguage() != language
            wrs -> FlowRouter.setParams language: language
    else
      submit.ladda('stop')
      Session.set 'error', 'Missing field'
