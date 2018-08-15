import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

import './InsertForm.Picker.jade';

Template.InsertFormPicker.helpers({
  getKey,
  getEntityTranslation,
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
    return template.allowedKeyValues.get() != null;
  },
  getItems() {
    const template = Template.instance();
    const searchText = template.insertForm.searchText.get();

    if (searchText != '') {
      const regEx = new RegExp(searchText, 'gi');

      return template.allowedValues
      .map((item) => {
        return String(item);
      })
      .filter((item) => {
        return item.match(regEx);
      });
    }
      return template.allowedValues
      .map((item) => {
        return String(item);
      });

  },
  getKeyValues() {
    const template = Template.instance();
    const searchText = template.insertForm.searchText.get();

    if (searchText != '') {
      const regEx = new RegExp(searchText, 'gi');

      return template.allowedKeyValues.get()
      .filter(({key, value}) => {
        return key.match(regEx) || value.match(regEx);
      });
    }
      return template.allowedKeyValues.get();

  },
  getItemKey() {
    const template = Template.instance();
    return template.key + 'Values.' + this;
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

Template.InsertFormPicker.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.key = data.key;
  template.value = new ReactiveVar(data.value);
  template.insertForm = data.parentInstance;
  template.allowedValues = data.allowedValues;
  template.allowedKeyValuesMethod = data.allowedKeyValuesMethod;
  template.allowedKeyValues = new ReactiveVar(data.allowedKeyValues);

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

Template.InsertFormPicker.onRendered(() => {});

Template.InsertFormPicker.onDestroyed(() => {});

Template.InsertFormPicker.events({
  'click .form-group': function(e, template) {
    const key = $(e.target).closest('.section').attr('key');
    const value = $(e.target).closest('.form-group').attr('key');

    template.insertForm.setFieldValue(key, value);
    template.value.set(value);
  }
});
