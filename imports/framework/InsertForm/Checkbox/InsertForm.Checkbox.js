import './InsertForm.Checkbox.jade';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

Template.InsertFormCheckbox.helpers({
  getKey,
  getEntityTranslation,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation
});

Template.InsertFormCheckbox.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.key = data.key;
  template.value = data.value;
  template.insertForm = data.parentInstance;
});

Template.InsertFormCheckbox.onRendered(() => {
  const template = Template.instance();
  template.insertForm.setFieldValue(template.key, true);
});

Template.InsertFormCheckbox.onDestroyed(() => {});

Template.InsertFormCheckbox.events({
  'change input': (e, template) => {
    const value = $(e.target).is(':checked');

    template.insertForm.setFieldValue(template.key, value);
  }
});
