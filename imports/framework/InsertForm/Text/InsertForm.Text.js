import './InsertForm.Text.jade';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

Template.InsertFormText.helpers({
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

Template.InsertFormText.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.key = data.key;
  template.insertForm = data.parentInstance;
});

Template.InsertFormText.onRendered(() => {});

Template.InsertFormText.onDestroyed(() => {});

Template.InsertFormText.events({
  'change input': (e, template) => {
    const value = $(e.target).val().trim();

    template.insertForm.setFieldValue(template.key, value);
  }
});
