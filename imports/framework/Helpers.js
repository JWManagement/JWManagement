import { Template } from 'meteor/templating';

export { getKey, getTitle, getEntityTranslation };

function getKey() {
  return Template.instance().key;
}

function getTitle() {
  return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
}

function getEntityTranslation(key, suffix) {
  if (key == null) {
    key = FlowRouter.getParam('key');
  }

  const attributeParts = [key];

  if (suffix != null && typeof(suffix) == 'string') {
    attributeParts.push(suffix);
  }

  const routeNameParts = FlowRouter.getRouteName().split('.');
  routeNameParts.pop();
  routeNameParts.splice(1, 0, 'entity');

  return TAPi18n.__(routeNameParts.concat(attributeParts).join('.').replace(/_/g, '.'));
}
