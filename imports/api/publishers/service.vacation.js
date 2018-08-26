import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { checkPermissions } from '/imports/framework/Functions/Security';
import Users from '/imports/api/users/Users';

import { getExtendedPublisher } from './Functions';

function publisherProfileVacationInsert({ projectId, userId }, newVacation) {
  checkPermissions(projectId, userId);

  try {
    let vacations = getExtendedPublisher(userId, projectId).profile.vacations;

    // support legacy format
    for (let vacation of vacations) {
      if (vacation.createdAt == null) {
        vacation.start = parseInt(moment(vacation.start, 'YYYYDDD').format('YYYYMMDD'), 10);
        vacation.end = parseInt(moment(vacation.end, 'YYYYDDD').format('YYYYMMDD'), 10);
      }
    }

    vacations.push({
      start: newVacation.start,
      end: newVacation.end
    });

    Users.persistence.update(userId, 'profile.vacations', vacations);
  } catch (e) {
    throw new Meteor.Error(e);
  }
}

function publisherProfileVacationDelete({ projectId, userId }, vacationId) {
  checkPermissions(projectId, userId);

  try {
    const vacations = getExtendedPublisher(userId, projectId).profile.vacations;
    let newVacations = [];

    for (let vacation of vacations) {
      if (vacation._id != vacationId) {
        newVacations.push(vacation);
      }
    }

    Users.persistence.update(userId, 'profile.vacations', newVacations);
  } catch (e) {
    throw new Meteor.Error(e);
  }
}

export {
  publisherProfileVacationInsert,
  publisherProfileVacationDelete
};
