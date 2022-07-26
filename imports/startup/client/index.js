import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import './datepicker/bootstrap-datepicker.min'
import './datepicker/bootstrap-datepicker.de.min'
import './datepicker/bootstrap-datepicker.fi.min'
import './datepicker/bootstrap-datepicker.fr.min'
import './datepicker/bootstrap-datepicker.hu.min'
import './datepicker/bootstrap-datepicker.it.min'
import './datepicker/bootstrap-datepicker.pl.min'
import './datepicker/bootstrap-datepicker.pt.min'
import './datepicker/bootstrap-datepicker.ru.min'

import '../common/i18next'
import '../common/moment'
import '../common/rolesExtensions'

import './routes/Routes.Private'
import './routes/Routes.Project'
import './routes/Routes.Public'

import '../../framework/Forms/DetailsForm/DetailsForm'
import '../../framework/Forms/InsertForm/InsertForm'
import '../../framework/Forms/SearchForm/SearchForm'
import '../../framework/Forms/UpdateForm/UpdateForm'

import '../../ui/landing/landing'
import '../../ui/signIn/signIn'
import '../../ui/signUp/signUp'

import '../../ui/dashboard/dashboard.jade'
import '../../ui/dashboard/dashboard.details'
import '../../ui/dashboard/myProjects/dashboard.myProjects.jade'
import '../../ui/dashboard/myProjects/dashboard.myProjects.details'
import '../../ui/dashboard/upcomingShifts/dashboard.upcomingShifts.jade'
import '../../ui/dashboard/upcomingShifts/dashboard.upcomingShifts.details'
import '../../ui/dashboard/pendingRequests/dashboard.pendingRequests.jade'
import '../../ui/dashboard/pendingRequests/dashboard.pendingRequests.details'
import '../../ui/dashboard/olderShifts/dashboard.olderShifts.jade'
import '../../ui/dashboard/olderShifts/dashboard.olderShifts.details'

import '../../ui/languages/languages.jade'
import '../../ui/languages/language.details'
import '../../ui/languages/language.update'
import '../../ui/languages/methods'

import '../../ui/users/users.jade'
import '../../ui/users/user.search'
import '../../ui/users/user.details'

import '../../ui/users/online/users.online.jade'
import '../../ui/users/online/users.online.details'

import '../../ui/users/adminEmails/users.adminEmails.details'

import '../../ui/projects/projects.jade'
import '../../ui/projects/project.search'
import '../../ui/projects/project.insert'
import '../../ui/projects/project.details'
import '../../ui/projects/project.support.details'

import '../../ui/publishers/publishers.jade'
import '../../ui/publishers/publisher.search'
import '../../ui/publishers/publisher.details'
import '../../ui/publishers/publisher.update'
import '../../ui/publishers/publisher.insert'
import '../../ui/publishers/publisher.password.insert'
import '../../ui/publishers/publisher.permissions.details'
import '../../ui/publishers/publisher.permissions.update'
import '../../ui/publishers/publisher.permissions.tag.details'
import '../../ui/publishers/publisher.permissions.tag.update'
import '../../ui/publishers/publisher.profile.availability.details'
import '../../ui/publishers/publisher.profile.availability.insert'
import '../../ui/publishers/publisher.profile.vacation.insert'

import '../../ui/vessels/vessels.jade'
import '../../ui/vessels/vessel.search'
import '../../ui/vessels/vessel.details'
import '../../ui/vessels/vessel.update'
import '../../ui/vessels/vessel.insert'
import '../../ui/vessels/vessel.visit.details'
import '../../ui/vessels/vessel.visit.update'
import '../../ui/vessels/vessel.visit.insert'
import '../../ui/vessels/vessel.visit.language.insert'

import '../../ui/calendar/calendar'

import './language'
import './title'

import '../common/migrations'

import { TimeSync } from 'meteor/mizzao:timesync'
import { UserStatus } from 'meteor/mizzao:user-status'

Meteor.startup(function () {
  BlazeLayout.setRoot('body')

  TimeSync.loggingEnabled = false

  Tracker.autorun((tracker) => {
    try {
      UserStatus.startMonitor({ threshold: 30000 })
      tracker.stop()
    } catch (e) { }
  })
})
