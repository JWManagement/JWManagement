import i18next from 'i18next'
import moment from 'moment'

Template.shiftsHeader.helpers

  prevWeekButton: ->
    chosenMonday = parseInt moment(FlowRouter.getQueryParam('showWeek')).isoWeekday(1).format('YYYYDDDD')

    weeks = Weeks.find({
      projectId: FlowRouter.getParam('projectId'),
      start: $lt: chosenMonday
    }, {
      fields: start: 1
      sort: start: -1
      limit: 1
    }).fetch()

    if weeks.length == 0 then 'disabled'

  weeks: ->
    thisMonday = parseInt moment(new Date()).isoWeekday(1).format('YYYYDDDD')
    chosenMonday = parseInt moment(FlowRouter.getQueryParam('showWeek')).isoWeekday(1).format('YYYYDDDD')

    startDate = if chosenMonday < thisMonday then chosenMonday else thisMonday

    weeks = Weeks.find
      projectId: FlowRouter.getParam('projectId')
      start: $gte: startDate
    ,
      fields: date: 1
      sort: start: 1

    weeks.fetch().map (w) -> w.date

  currentWeek: -> 'active' if this + '' == FlowRouter.getQueryParam('showWeek')

  nextWeekButton: ->
    chosenMonday = parseInt moment(FlowRouter.getQueryParam('showWeek')).isoWeekday(1).format('YYYYDDDD')

    weeks = Weeks.find({
      projectId: FlowRouter.getParam('projectId'),
      start: $gt: chosenMonday
    }, {
      fields: start: 1
      sort: start: 1
      limit: 1
    }).fetch()

    if weeks.length == 0 then 'disabled'

  visibleTags: ->
    projectId = FlowRouter.getParam('projectId')
    tags = FlowRouter.getQueryParam('showTags') + ''
    tags = tags.split('_')
    project = Projects.findOne projectId, fields: 'tags._id': 1, 'tags.name': 1

    if project?.tags
      result = []

      for t in project.tags when t._id in tags && Roles.userIsInRole Meteor.userId(), Permissions.participant, t._id
        result.push t.name

      result.join(', ')

  tags: ->
    projectId = FlowRouter.getParam('projectId')
    project = Projects.findOne projectId, fields: tags: 1, templates: 1

    if project?
      project.tags

  showTag: -> FlowRouter.getQueryParam('showTags')?.indexOf(@_id) > -1

Template.shiftsHeader.onCreated ->

    self = this

    @autorun ->
      projectId = FlowRouter.getParam('projectId')

      unless FlowRouter.getQueryParam('weekId')?
        week = FlowRouter.getQueryParam('showWeek')
        Meteor.subscribe 'futureWeeks', projectId, week

        prevWeek = moment(week).subtract(1, 'w')
        prevWeek = moment(prevWeek).format('GGGG[W]WW')
        Meteor.subscribe 'week', projectId, prevWeek

        nextWeek = moment(week).add(1, 'w')
        nextWeek = moment(nextWeek).format('GGGG[W]WW')
        Meteor.subscribe 'week', projectId, nextWeek

Template.shiftsHeader.events

  'click #hideNames': ->
    wrs -> FlowRouter.setQueryParams view: 'hideNames'

  'click #showNames': ->
    wrs -> FlowRouter.setQueryParams view: undefined

  'click #editShifts': ->
    wrs -> FlowRouter.setQueryParams view: 'editShifts'

  'click #deleteWeek': ->
    projectId = FlowRouter.getParam('projectId')
    weekNumber = FlowRouter.getQueryParam('showWeek')
    week = Weeks.findOne({ date: weekNumber })

    swalYesNo
      swal: 'delete.wholeWeek'
      doConfirm: ->
        Meteor.call 'deleteWeek', projectId, week._id, handleError

  'click #prevWeek:not(.disabled)': ->
    chosenMonday = parseInt moment(FlowRouter.getQueryParam('showWeek')).isoWeekday(1).format('YYYYDDDD')

    week = Weeks.find({
      projectId: FlowRouter.getParam('projectId'),
      start: $lt: chosenMonday
    }, {
      fields: date: 1, start: 1
      sort: start: -1
      limit: 1
    }).fetch()[0].date

    wrs -> FlowRouter.setQueryParams showWeek: week

  'click #nextWeek:not(.disabled)': ->
    chosenMonday = parseInt moment(FlowRouter.getQueryParam('showWeek')).isoWeekday(1).format('YYYYDDDD')

    week = Weeks.find({
      projectId: FlowRouter.getParam('projectId'),
      start: $gt: chosenMonday
    }, {
      fields: date: 1, start: 1
      sort: start: 1
      limit: 1
    }).fetch()[0].date

    wrs -> FlowRouter.setQueryParams showWeek: week

  'click .week-item': ->
    week = this + ''
    wrs -> FlowRouter.setQueryParams showWeek: week

  'click .add-week': ->
    wrs -> FlowRouter.setQueryParams addWeek: true

  'click .tag-visible': (e) ->
    e.preventDefault()
    e.stopPropagation()
    tags = FlowRouter.getQueryParam('showTags').split('_')
    tags.splice(tags.indexOf(@_id), 1) if tags.length > 1
    wrs -> FlowRouter.setQueryParams showTags: tags.join('_')

  'click .tag-hidden': (e) ->
    e.preventDefault()
    e.stopPropagation()
    tags = FlowRouter.getQueryParam('showTags').split('_')
    tags.push(@_id)
    wrs -> FlowRouter.setQueryParams showTags: tags.join('_')

  'click #sendConfirmWeek': ->
    projectId = FlowRouter.getParam('projectId')
    tagId = FlowRouter.getQueryParam('showTags')
    week = Weeks.findOne
      projectId: FlowRouter.getParam('projectId')
      date: FlowRouter.getQueryParam('showWeek')
    ,
      fields: _id: 1

    if tagId.split("_").length > 1
      tags = tagId.split("_")
      options = []
      dbTags = Projects.findOne(projectId).tags

      for tag in tags
        tagNr = dbTags.map((e) -> e._id).indexOf(tag)
        name = dbTags[tagNr].name
        options.push
          value: tag, text: name

      swal.withForm
        title: i18next.t('swal.sendMail.selectTag.title')
        text: i18next.t('swal.sendMail.selectTag.text')
        showCancelButton: true
        cancelButtonText: i18next.t('swal.sendMail.selectTag.cancel')
        confirmButtonText: i18next.t('swal.sendMail.selectTag.confirm')
        closeOnConfirm: false
        formFields: [
          id: 'select', type: 'select', options: options
        ]
      , (isConfirm) ->
        if isConfirm
          tagId = @swalForm.select

          swalYesNo
            swal: 'sendMail.confirmWeek'
            doConfirm: -> Meteor.call 'sendConfirmWeek', projectId, tagId, week._id
    else
      swalYesNo
        swal: 'sendMail.confirmWeek'
        doConfirm: -> Meteor.call 'sendConfirmWeek', projectId, tagId, week._id

  'click #printShifts': ->
    window.print();
