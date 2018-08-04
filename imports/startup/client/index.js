import '/imports/api/datepicker/bootstrap-datepicker.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.de.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.fi.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.fr.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.hu.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.it.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.pl.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.pt.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.ru.min.js';

import '/imports/startup/common/rolesExtensions.js';

import '/imports/api/projects/projects.js';

import '/imports/api/routes/mainRoutes.js';
import '/imports/api/routes/projectRoutes.js';
import '/imports/api/routes/policyRoutes.js';

import '/imports/framework/DetailsForm/DetailsForm.js';
import '/imports/framework/InsertForm/InsertForm.js';
import '/imports/framework/SearchForm/SearchForm.js';
import '/imports/framework/UpdateForm/UpdateForm.js';
import '/imports/framework/templateHelpers.js';

import '/imports/ui/dashboard/dashboard.jade';
import '/imports/ui/dashboard/dashboard.details.js';

import '/imports/ui/languages/languages.jade';
import '/imports/ui/languages/language.details.js';
import '/imports/ui/languages/language.update.js';
import '/imports/ui/languages/methods.js';

import '/imports/ui/users/users.jade';
import '/imports/ui/users/user.search.js';
import '/imports/ui/users/user.details.js';

import '/imports/ui/projects/projects.jade';
import '/imports/ui/projects/project.search.js';
import '/imports/ui/projects/project.details.js';

import '/imports/ui/publishers/publishers.jade';
import '/imports/ui/publishers/publisher.search.js';
import '/imports/ui/publishers/publisher.details.js';
import '/imports/ui/publishers/publisher.update.js';
import '/imports/ui/publishers/publisher.insert.js';
import '/imports/ui/publishers/publisher.password.insert.js';
import '/imports/ui/publishers/publisher.profile.availability.details.js';
import '/imports/ui/publishers/publisher.profile.availability.insert.js';
import '/imports/ui/publishers/publisher.profile.vacation.insert.js';

import '/imports/ui/vessels/vessels.jade';
import '/imports/ui/vessels/vessel.search.js';
import '/imports/ui/vessels/vessel.details.js';
import '/imports/ui/vessels/vessel.update.js';
import '/imports/ui/vessels/vessel.insert.js';
import '/imports/ui/vessels/vessel.visit.details.js';
import '/imports/ui/vessels/vessel.visit.update.js';
import '/imports/ui/vessels/vessel.visit.insert.js';
import '/imports/ui/vessels/vessel.visit.language.insert.js';

import '/imports/ui/notes/notes.jade';
import '/imports/ui/notes/note.search.js';
import '/imports/ui/notes/note.details.js';
import '/imports/ui/notes/note.update.js';
import '/imports/ui/notes/note.insert.js';

import '/imports/ui/calendar/calendar.js';

import '/imports/startup/client/language.js';

import { TimeSync } from 'meteor/mizzao:timesync';

import SimpleSchemaHelper from '/imports/startup/common/SimpleSchemaHelper.js';
SimpleSchemaHelper.init();

Meteor.startup(function() {
  BlazeLayout.setRoot('body');

  TimeSync.loggingEnabled = false;
});

Tracker.autorun(function() {
  const routeName = FlowRouter.getRouteName();
  let title = TAPi18n.__('navigation.' + routeName);

  if (routeName === 'home' && !Meteor.user()) {
    title = TAPi18n.__('navigation.login');
  }

  document.title = title + ' | JW Management';

  $('body').attr('page', routeName);
});
