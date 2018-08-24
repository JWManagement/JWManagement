import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { getKey, getEntityTranslation } from '/imports/framework/Helpers/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Error';

import './UpdateForm.Picker.jade';

Template.UpdateFormPicker.helpers({
  getEntityTranslation,
  getKey,
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
      const regEx = new RegExp(searchText, 'gi');
      return template.allowedValues.filter((value) => {
        return value.match(regEx);
      });
    }
      return template.allowedValues;

  },
  getKeyValues() {
    const template = Template.instance();
    const searchText = template.updateForm.searchText.get();

    if (searchText != '') {
      const regEx = new RegExp(searchText, 'gi');
      return template.allowedKeyValues.get().filter(({ key, value }) => {
        return key.match(regEx) || value.match(regEx);
      });
    }
      return template.allowedKeyValues.get();

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
    }
      return 'search-disabled';

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
