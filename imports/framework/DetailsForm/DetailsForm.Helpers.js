import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import RoleManager from '/imports/api/managers/RoleManager';

export { loadData, getValue, getKey, isType, hasPermissionToSee };

function loadData(template) {
  if (template.getMethod != null) {
    Meteor.call(template.getMethod, FlowRouter.current().params, (e, entity) => {
      if (e == null) {
        template.item.set(entity);
        template.noResult.set(false);
        template.isLoading.set(false);
      } else {
        alert('SERVER ERROR');
      }
    });
  } else {
    template.item.set({});
    template.noResult.set(false);
    template.isLoading.set(false);
  }
}

function getValue(definition, entity) {
  const key = definition.key;
  let value = entity[key];

  if (key.indexOf('_') > 0) {
    value = entity;

    for (property of key.split('_')) {
      if (property in value) {
        value = value[property];
      } else {
        return '';
      }
    }
  }

  return value;
}

function getKey(definition) {
  if (definition.linkedKey != null) {
    return definition.linkedKey;
  }

  return definition.key;
}

function isType(field, type) {
  return field.type == type;
}

function hasPermissionToSee(definition) {
  let hasRole = true;
  let customFulfilled = true;

  if (definition.canSee != null) {
    const projectId = FlowRouter.getParam('projectId');
    hasRole = RoleManager.hasPermission(projectId, definition.canSee);
  }

  if (definition.custom != null) {
    const template = Template.instance();
    const item = template.item.get();
    customFulfilled = definition.custom(item);
  }

  return hasRole && customFulfilled;
}
