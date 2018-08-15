import { Template } from 'meteor/templating';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

import './InsertForm.Password.jade';

Template.InsertFormPassword.helpers({
  getKey,
  getEntityTranslation,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getValue() {
    const data = Template.currentData().data;
    if (data.value != null) {
      return data.value;
    }
    return '';
  }
});

Template.InsertFormPassword.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.key = data.key;
  template.insertForm = data.parentInstance;
});

Template.InsertFormPassword.onRendered(() => {});

Template.InsertFormPassword.onDestroyed(() => {});

Template.InsertFormPassword.events({
  'change input': (e, template) => {
    const value = $(e.target).val().trim();

    template.insertForm.setFieldValue(template.key, value);
  }
});
