import autosize from 'autosize';

import './UpdateForm.Textbox.jade';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

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
