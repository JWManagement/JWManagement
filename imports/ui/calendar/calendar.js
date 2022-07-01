import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'
import moment from 'moment'

import { wrs } from '../../framework/Functions/Async'

import './calendar.tpl.jade'
import './calendar.scss'

Template.calendar.helpers({
  isLoading () {
    const template = Template.instance()
    return template.isLoading.get()
  },
  getShifts () {
    const template = Template.instance()
    const dayOfYear = + moment(template.selectedDate.get()).format('YYYYDDDD')
    return Shifts.find(
      {
        projectId: FlowRouter.getParam('projectId'),
        date: dayOfYear
      }, {
      sort: {
        start: 1,
        end: 1,
        tagId: 1
      }
    }).fetch()
  },
  getFormattedTime (time) {
    return moment(time, 'Hmm').format(i18next.t('dateFormat.time'))
  },
  hasNoRequests () {
    return this.approvedRequests === 0 && this.pendingRequests === 0
  }
})

Template.calendar.onCreated(() => {
  const template = Template.instance()

  template.selectedDate = new ReactiveVar(new Date())
  template.isLoading = new ReactiveVar(false)


  let year = FlowRouter.getParam('year')
  let month = FlowRouter.getParam('month')
  let day = FlowRouter.getParam('day')
  if (year && month && day) {
    template.selectedDate.set(new Date(year, month - 1, day))
  }

  Tracker.autorun(() => {
    const projectId = FlowRouter.getParam('projectId')
    const date = moment(template.selectedDate.get())
    ShiftSubs.subscribe('calendarShifts', projectId, + date.format('YYYYDDDD'))
    wrs(() => {
      FlowRouter.setParams({
        year: date.format('YYYY'),
        month: date.format('MM'),
        day: date.format('DD')
      })
    })
  })
})

Template.calendar.onRendered(() => {
  $('body').attr('type', 'calendar')

  const template = Template.instance()
  const $datePicker = template.$('#datepicker')

  $datePicker.datepicker({
    maxViewMode: 0,
    minViewMode: 0,
    weekStart: 1,
    templates: {
      leftArrow: '<i class="fa fa-chevron-left"></i>',
      rightArrow: '<i class="fa fa-chevron-right"></i>'
    },
    language: i18next.language
  })
    .on('changeDate', function (e) {
      template.selectedDate.set(e.date)
    })
    .datepicker('setDate', template.selectedDate.get())

  window.scrollTo(0, 0)
})

Template.calendar.onDestroyed(() => {
  $('body').attr('type', '')
})

Template.calendar.events({
  'click .shift' () {
    FlowRouter.setQueryParams({
      showShift: this._id
    })
  }
})
