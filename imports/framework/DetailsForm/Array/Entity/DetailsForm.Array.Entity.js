import moment from 'moment';

import './DetailsForm.Array.Entity.jade';

import { getValue, getKey, isType } from '../../DetailsForm';

Template.DetailsFormArrayEntity.helpers({
  getKey,
  getValue(definition, entity) {
    const value = getValue(definition, entity);

    if (definition.type == 'dropdown') {
      return TAPi18n.__('language._' + entity._id.toUpperCase());
    }

    if (definition.type == 'date' && value != null) {
      const uiFormat = TAPi18n.__('dateFormat.' + definition.uiFormat);
      const dbFormat = definition.dbFormat;

      return moment(value, dbFormat).format(uiFormat);
    }

    return value;
  },
  isType
});

Template.DetailsFormArrayEntity.onCreated(() => {});

Template.DetailsFormArrayEntity.onRendered(() => {});

Template.DetailsFormArrayEntity.onDestroyed(() => {});

Template.DetailsFormArrayEntity.events({});
