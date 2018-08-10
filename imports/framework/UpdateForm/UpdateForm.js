import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

import './UpdateForm.jade';
import './UpdateForm.scss';

import './Text/UpdateForm.Text';
import './Date/UpdateForm.Date';
import './Dropdown/UpdateForm.Dropdown';
import './Picker/UpdateForm.Picker';
import './Checkbox/UpdateForm.Checkbox';
import './Textbox/UpdateForm.Textbox';

const possibleUpdateTypes = ['date', 'checkbox', 'dropdown', 'picker', 'textbox'];

Template.UpdateForm.helpers({
  getEntityTranslation,
  getKey,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getBackLink() {
    FlowRouter.getParam('language');
    return FlowRouter.path(Template.instance().backLink.get(), FlowRouter.current().params);
  },
  getSearchTranslation() {
    if (FlowRouter.getParam('key') != null) {
      const key = FlowRouter.getParam('key').replace(/_/g, '.') + 'Values';

      let routeNameParts = FlowRouter.getRouteName().split('.');
      routeNameParts.pop();
      routeNameParts.splice(1, 0, 'entity');

      let attributeParts = [key];
      attributeParts.push('placeholder');

      return TAPi18n.__(routeNameParts.concat(attributeParts).join('.'));
    }
  },
  isSearchEnabled() {
    return Template.instance().inputData.get().search == true && FlowRouter.getParam('key') != null;
  },
  isReady() {
    return !Template.instance().isLoading.get() && !Template.instance().noResult.get();
  },
  isText() {
    return Template.instance().inputData.get().type == 'text';
  },
  isDate() {
    return Template.instance().inputData.get().type == 'date';
  },
  isDropdown() {
    return Template.instance().inputData.get().type == 'dropdown';
  },
  isPicker() {
    return Template.instance().inputData.get().type == 'picker';
  },
  isCheckbox() {
    return Template.instance().inputData.get().type == 'checkbox';
  },
  isTextbox() {
    return Template.instance().inputData.get().type == 'textbox';
  },
  getInputData() {
    return Template.instance().inputData.get();
  }
});

Template.UpdateForm.onCreated(() => {
  const template = Template.instance();

  template.backLink = new ReactiveVar('');
  template.isLoading = new ReactiveVar(true);
  template.noResult = new ReactiveVar(true);
  template.inputData = new ReactiveVar({});
  template.inputType = new ReactiveVar('');
  template.searchText = new ReactiveVar('');

  template.updateEntity = (value) => {
    const routeName = FlowRouter.getRouteName();
    const params = FlowRouter.current().params;
    const key = FlowRouter.getParam('key');

    Meteor.call(routeName, params, key, value, (e) => {
      if (e != null) {
        if (e.error.error == 'validation-error' && e.error.reason.length > 0) {
          let inputData = template.inputData.get();
          inputData.error = e.error.reason[0].type;
          template.inputData.set(inputData);
        } else {
          alert('SERVER ERROR');
        }
      }
    });
  }
});

Template.UpdateForm.onRendered(() => {
  $('body').addClass('md-skin');
  $('body').addClass('top-navigation');
  $('body').attr('type', 'UpdateForm');

  const template = Template.instance();
  const data = Template.currentData().data;

  template.backLink.set(data.backLink);
  template.isLoading.set(true);
  template.noResult.set(true);
  template.inputData.set({ parentInstance: template });

  Meteor.call(data.getMethod, FlowRouter.current().params, (e, value) => {
    if (e == null) {
      let inputData = template.inputData.get();
      inputData.value = value;
      template.inputData.set(inputData);
      template.noResult.set(false);
      template.isLoading.set(false);
    } else {
      alert('SERVER ERROR');
    }
  });

  data.fields.some((field) => {
    if (field.key == FlowRouter.getParam('key')) {
      let inputData = template.inputData.get();
      inputData.type = 'text';

      if (possibleUpdateTypes.indexOf(field.type) > -1) {
        inputData.type = field.type;
      }

      if (inputData.type == 'date') {
        inputData.format = field.format;
      }

      if (['dropdown', 'picker'].indexOf(inputData.type) > -1) {
        if ('allowedValues' in field) {
          inputData.allowedValues = field.allowedValues;
        } else if ('allowedKeyValuesMethod' in field) {
          inputData.allowedKeyValuesMethod = field.allowedKeyValuesMethod;
        }

        inputData.search = field.search || false;
      }

      template.inputData.set(inputData);
      return true;
    }
  });

  window.scrollTo(0, 0);
});

Template.UpdateForm.onDestroyed(() => {
  $('body').removeClass('md-skin');
  $('body').removeClass('top-navigation');
  $('body').attr('type', '');
});

Template.UpdateForm.events({
  'submit form': (e) => {
    e.preventDefault();
  },
  'keyup #search': () => {
    const template = Template.instance();
    const value = $('#search').val();
    template.searchText.set(value);
  }
});
