import autosize from 'autosize';
import { Template } from 'meteor/templating';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Helpers/Error';

import './UpdateForm.Textbox.jade';

Template.UpdateFormTextbox.helpers({
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

Template.UpdateFormTextbox.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.value = data.value;
  template.updateForm = data.parentInstance;
});

Template.UpdateFormTextbox.onRendered(() => {
  autosize(document.querySelectorAll('textarea'));
});

Template.UpdateFormTextbox.onDestroyed(() => {});

Template.UpdateFormTextbox.events({
  'change textarea': (e, template) => {
    const value = $(e.target).val().trim();
    template.updateForm.updateEntity(value);
  }
});
