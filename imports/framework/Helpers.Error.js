import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

export { hasError, getErrorClass, getEntityErrorTranslation };

function hasError() {
  const data = Template.currentData().data;
  return isHandledError(data.error);
};

function getErrorClass() {
  const data = Template.currentData().data;
  if (isHandledError(data.error)) {
    return 'has-error';
  }
  return '';
};

function getEntityErrorTranslation() {
  const data = Template.currentData().data;
  if (isHandledError(data.error)) {
    return TAPi18n.__('validation.' + data.error);
  }
  return '';
};

function isHandledError(error) {
  return ['required', 'unique', 'minString8', 'passwordMismatch', 'hasToBeBigger'].indexOf(error) > -1;
}
