import './DetailsForm.Dropdown.jade';

import { getValue, getKey } from '../DetailsForm';

Template.DetailsFormDropdown.helpers({
  getKey,
  getValue(definition, entity) {
    let value = entity;

    if (typeof value != 'string') {
      value = getValue(definition, entity);
    }

    let routeNameParts = FlowRouter.getRouteName().split('.');
    routeNameParts.pop();
    routeNameParts.splice(1, 0, 'entity');
    routeNameParts.push(definition.key.replace(/_/g, '.') + 'Values');
    routeNameParts.push(value);

    return TAPi18n.__(routeNameParts.join('.'));
  }
});

Template.DetailsFormDropdown.onCreated(() => {});

Template.DetailsFormDropdown.onRendered(() => {});

Template.DetailsFormDropdown.onDestroyed(() => {});

Template.DetailsFormDropdown.events({});
