import './UpdateForm.Picker.jade';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

Template.UpdateFormPicker.helpers({
  getEntityTranslation,
  getKey,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  isAllowedValues() {
    const template = Template.instance();
    return template.allowedValues != null;
  },
  isAllowedKeyValues() {
    const template = Template.instance();
    return template.allowedKeyValuesMethod != null;
  },
  getItems() {
    const template = Template.instance();
    const searchText = template.updateForm.searchText.get();

    if (searchText != '') {
      const regEx = new RegExp(searchText, 'gi')
      return template.allowedValues.filter((value) => {
        return value.match(regEx);
      });
    } else {
      return template.allowedValues;
    }
  },
  getKeyValues() {
    const template = Template.instance();
    const searchText = template.updateForm.searchText.get();

    if (searchText != '') {
      const regEx = new RegExp(searchText, 'gi')
      return template.allowedKeyValues.get().filter(({ key, value }) => {
        return key.match(regEx) || value.match(regEx);
      });
    } else {
      return template.allowedKeyValues.get();
    }
  },
  getItemKey() {
    const item = Template.currentData();
    return FlowRouter.getParam('key') + 'Values.' + item;
  },
  isChecked(keyValue) {
    const template = Template.instance();
    return keyValue == template.value.get();
  },
  getSearchEnabledClass() {
    const data = Template.currentData().data;

    if (data.search == true) {
      return 'search-enabled';
    } else {
      return 'search-disabled';
    }
  }
});

Template.UpdateFormPicker.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.value = new ReactiveVar(data.value);
  template.updateForm = data.parentInstance;
  template.allowedValues = data.allowedValues;
  template.allowedKeyValuesMethod = data.allowedKeyValuesMethod;
  template.allowedKeyValues = new ReactiveVar([]);

  if (template.allowedKeyValuesMethod != null) {
    Meteor.call(template.allowedKeyValuesMethod, FlowRouter.current().params, (e, keyValues) => {
      if (e == null) {
        template.allowedKeyValues.set(keyValues);
      } else {
        alert('SERVER ERROR');
      }
    });
  }
});

Template.UpdateFormPicker.onRendered(() => {});

Template.UpdateFormPicker.onDestroyed(() => {});

Template.UpdateFormPicker.events({
  'click .item': (e, template) => {
    const value = $(e.target).closest('.item').attr('key');
    template.updateForm.updateEntity(value);
    template.value.set(value);
  }
});
