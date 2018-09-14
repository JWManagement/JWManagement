import { Meteor } from 'meteor/meteor';

import {
  publisherPasswordInsert,
  publisherPasswordReset,
  publisherInvite,
  removeFromProject
} from './service.security';

import {
  publisherProfileAvailabilityInsert,
  publisherProfileAvailabilityGet,
  publisherProfileAvailabilityDelete
} from './service.availability';

import {
  publisherProfileVacationInsert,
  publisherProfileVacationDelete
} from './service.vacation';

import {
  publisherPermissionsGet,
  publisherPermissionsProjectGet,
  publisherPermissionsUpdate,
  publisherPermissionsTagGet
} from './service.permissions';

import {
  publisherSearch,
  publisherGet,
  publisherGetField,
  publisherInsert,
  publisherUpdate
} from './service.crud';

Meteor.methods({
  'publisher.search': publisherSearch,
  'publisher.get': publisherGet,
  'publisher.getField': publisherGetField,
  'publisher.insert': publisherInsert,
  'publisher.update': publisherUpdate,
  'publisher.password.insert': publisherPasswordInsert,
  'publisher.password.reset': publisherPasswordReset,
  'publisher.invite': publisherInvite,
  'publisher.permissions.get': publisherPermissionsGet,
  'publisher.permissions.project.get': publisherPermissionsProjectGet,
  'publisher.permissions.update': publisherPermissionsUpdate,
  'publisher.permissions.tag.get': publisherPermissionsTagGet,
  'publisher.removeFromProject': removeFromProject,
  'publisher.profile.availability.insert': publisherProfileAvailabilityInsert,
  'publisher.profile.availability.get': publisherProfileAvailabilityGet,
  'publisher.profile.availability.delete': publisherProfileAvailabilityDelete,
  'publisher.profile.vacation.insert': publisherProfileVacationInsert,
  'publisher.profile.vacation.delete': publisherProfileVacationDelete
});
