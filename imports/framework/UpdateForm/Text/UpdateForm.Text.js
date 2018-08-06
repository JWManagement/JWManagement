import { Template } from 'meteor/templating';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

import './UpdateForm.Text.jade';

Template.UpdateFormText.helpers({
  getEntityTranslation,
  getKey,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getValue() {
    return Template.instance().value;
  }
});

Template.UpdateFormText.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.value = data.value;
  template.updateForm = data.parentInstance;
});

Template.UpdateFormText.onRendered(() => {});

Template.UpdateFormText.onDestroyed(() => {});

Template.UpdateFormText.events({
  'change input': (e, template) => {
    const value = $(e.target).val().trim();
    template.updateForm.updateEntity(value);
  }
});
