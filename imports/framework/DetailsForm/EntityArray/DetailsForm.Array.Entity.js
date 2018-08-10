import moment from 'moment';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import { getValue, getKey, isType } from '/imports/framework/DetailsForm/DetailsForm.Helpers';
import { getEntityTranslation } from '/imports/framework/Helpers';

import './DetailsForm.Array.Entity.jade';

Template.DetailsFormArrayEntity.helpers({
  getEntityTranslation,
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

Template.DetailsFormArrayEntity.events({
  'click tr.array-item': (e) => {
    e.stopPropagation();

    const data = Template.currentData();
    const link = data.definition.link;
    const key = data.definition.key;
    const entityId = data.entity._id;

    let params = FlowRouter.current().params;
    params[key + 'Id'] = entityId;

    FlowRouter.go(FlowRouter.path(link, params));
  }
});
