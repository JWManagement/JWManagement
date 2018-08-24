import { Template } from 'meteor/templating';

import { getKey, getEntityTranslation } from '/imports/framework/Helpers/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Error';

import './UpdateForm.Checkbox.jade';

Template.UpdateFormCheckbox.helpers({
  getEntityTranslation,
  getKey,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getValue() {
    return Template.instance().value;
  }
});

Template.UpdateFormCheckbox.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.value = data.value;
  template.updateForm = data.parentInstance;
});

Template.UpdateFormCheckbox.onRendered(() => {});

Template.UpdateFormCheckbox.onDestroyed(() => {});

Template.UpdateFormCheckbox.events({
  'change input': (e, template) => {
    const value = $(e.target).is(':checked');

    template.updateForm.updateEntity(value);
  }
});
