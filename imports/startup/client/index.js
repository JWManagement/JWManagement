import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/startup/client/datepicker/bootstrap-datepicker.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.de.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.fi.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.fr.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.hu.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.it.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.pl.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.pt.min';
import '/imports/startup/client/datepicker/bootstrap-datepicker.ru.min';

import '/imports/startup/common/moment';
import '/imports/startup/common/rolesExtensions';

import '/imports/api/projects/projects';

import '/imports/api/routes/Routes.Public.Policy';
import '/imports/api/routes/Routes.Private';
import '/imports/api/routes/Routes.Project';
import '/imports/api/routes/Routes.Public';

import '/imports/framework/DetailsForm/DetailsForm';
import '/imports/framework/InsertForm/InsertForm';
import '/imports/framework/SearchForm/SearchForm';
import '/imports/framework/UpdateForm/UpdateForm';

import '/imports/ui/dashboard/dashboard.jade';
import '/imports/ui/dashboard/dashboard.details';

import '/imports/ui/languages/languages.jade';
import '/imports/ui/languages/language.details';
import '/imports/ui/languages/language.update';
import '/imports/ui/languages/methods';

import '/imports/ui/users/users.jade';
import '/imports/ui/users/user.search';
import '/imports/ui/users/user.details';

import '/imports/ui/projects/projects.jade';
import '/imports/ui/projects/project.search';
import '/imports/ui/projects/project.details';

import '/imports/ui/publishers/publishers.jade';
import '/imports/ui/publishers/publisher.search';
import '/imports/ui/publishers/publisher.details';
import '/imports/ui/publishers/publisher.update';
import '/imports/ui/publishers/publisher.insert';
import '/imports/ui/publishers/publisher.password.insert';
import '/imports/ui/publishers/publisher.profile.availability.details';
import '/imports/ui/publishers/publisher.profile.availability.insert';
import '/imports/ui/publishers/publisher.profile.vacation.insert';

import '/imports/ui/vessels/vessels.jade';
import '/imports/ui/vessels/vessel.search';
import '/imports/ui/vessels/vessel.details';
import '/imports/ui/vessels/vessel.update';
import '/imports/ui/vessels/vessel.insert';
import '/imports/ui/vessels/vessel.visit.details';
import '/imports/ui/vessels/vessel.visit.update';
import '/imports/ui/vessels/vessel.visit.insert';
import '/imports/ui/vessels/vessel.visit.language.insert';

import '/imports/ui/notes/notes.jade';
import '/imports/ui/notes/note.search';
import '/imports/ui/notes/note.details';
import '/imports/ui/notes/note.update';
import '/imports/ui/notes/note.insert';

import '/imports/ui/calendar/calendar';

import '/imports/startup/client/language';

import { TimeSync } from 'meteor/mizzao:timesync';

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
