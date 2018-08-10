import moment from 'moment';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import { getKey, getTitle, getEntityTranslation } from '/imports/framework/Helpers';
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers.Error';

import './UpdateForm.Date.jade';

Template.UpdateFormDate.helpers({
  getEntityTranslation,
  getKey,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation
});

Template.UpdateFormDate.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.valueRaw = data.value;
  template.format = data.format;
  template.updateForm = data.parentInstance;

  if (template.valueRaw != null && template.valueRaw == 'today') {
    template.valueRaw = moment(Date()).format(template.format);
  }
});

Template.UpdateFormDate.onRendered(() => {
  const template = Template.instance();
  const $datePicker = template.$('.datepicker');

  $datePicker.datepicker({
    maxViewMode: 0,
    weekStart: 1,
    language: TAPi18n.getLanguage()
  })
  .on('changeDate', (e) => {
    const value = $datePicker.datepicker('getDate');
    let valueRaw = parseInt(moment(value, 'YYYY-MM-DD').format(template.format));

    if (value == '') {
      valueRaw = null;
    }

    if (valueRaw != template.valueRaw) {
      template.valueRaw = valueRaw;
      template.updateForm.updateEntity(valueRaw);
    }
  });

  if (template.valueRaw != null && template.valueRaw != '') {
    $datePicker.datepicker('setDate', moment(template.valueRaw, template.format).toDate());
  }

  $datePicker.find('.table-condensed').removeClass('table-condensed');
});

Template.UpdateFormDate.onDestroyed(() => {});
