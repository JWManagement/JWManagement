import moment from 'moment';
import RoleManager from '/imports/api/managers/RoleManager';
import RouteManager from '/imports/api/managers/RouteManager';

import './DetailsForm.jade';
import './DetailsForm.scss';

import './Actions/DetailsForm.Actions';
import './Date/DetailsForm.Date';
import './Dropdown/DetailsForm.Dropdown';
import './Email/DetailsForm.Email';
import './Link/DetailsForm.Link';
import './Navigation/DetailsForm.Navigation';
import './Phone/DetailsForm.Phone';
import './Text/DetailsForm.Text';
import './Textbox/DetailsForm.Textbox';
import './Header/DetailsForm.Header';

export { getValue, getKey };

// confirm, delete, CHECKBOX

Template.DetailsForm.helpers({
  getLinkedKey(content) {
    if (content.linkedKey != null) {
      return content.linkedKey;
    }
    return content.key;
  },
  getSectionTranslation(key) {
    return TAPi18n.__(FlowRouter.getRouteName() + '.sections.' + key.replace(/_/g, '.'));
  },
  getBackgroundColor(section) {
    return (section.background != null ? section.background : '');
  },
  isType(field, type) {
    return field.type == type;
  },
  item() {
    const template = Template.instance();
    return template.item.get();
  },
  isTel(field) {
    return field.type == 'tel';
  },
  isEmail(field) {
    return field.type == 'email';
  },
  isDropdown(field) {
    return field.type == 'dropdown';
  },
  isKeyValue(field) {
    return field.type == 'keyValue';
  },
  isTextbox(field) {
    return field.type == 'textbox';
  },
  isTitle(field) {
    return field.type == 'title';
  },
  isDescription(field) {
    return field.type == 'description';
  },
  isDelete(field) {
    return field.type == 'delete';
  },
  isArray(content) {
    return typeof(content.type) == 'object' && content.type.length >= 0;
  },
  isLoading() {
    return Template.instance().isLoading.get();
  },
  noResult() {
    return Template.instance().noResult.get();
  },
  hasPermissionToSee(definition) {
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
  },
  sections() {
    const template = Template.instance();
    const item = template.item.get();

    if (item != null) {
      return template.sections.map((section) => {
        if (section.contents != null) {
          section.contents = section.contents.map((content) => {
            if ('canUpdate' in content) {
              if (content.canUpdate == 'author') {
                content.readonly = item.createdBy != Meteor.userId();
              }
            }
            if (typeof(content.type) == 'object' && content.type.length > 0) {
              if ('click' in content.type[0] && 'canDo' in content.type[0].click) {
                if (content.type[0].click.canDo == 'author' && item.createdBy != Meteor.userId()) {
                  delete content.type[0].click;
                }
              }
            }
            return content;
          });
        }
        if (section.actions != null) {
          section.actions = section.actions.filter((action) => {
            if ('canSee' in action && action.canSee == 'author') {
              if (item.createdBy != Meteor.userId()) {
                return false;
              }
            }
            return true;
          });
        }
        return section;
      })
      .filter((section) =>
        ('contents' in section && section.contents.length > 0)
        || ('actions' in section && section.actions.length > 0)
        || ('type') in section && section.type == 'header');
    } else {
      return template.sections;
    }
  },
  getValue(content) {
    const template = Template.instance();
    const key = content.key;
    const item = template.item.get();
    let value = '';

    if (key.indexOf('_') > 0) {
      value = item;

      for (property of key.split('_')) {
        if (property in value) {
          value = value[property];
        } else {
          return '';
        }
      }
    } else {
      value = item[key];
    }

    if (content.type == 'dropdown') {
      return TAPi18n.__([
        FlowRouter.getRouteName().split('.')[0],
        'entity',
        key + 'Values',
        value
      ].join('.').replace(/_/g, '.'));
    } else if (content.type == 'checkbox') {
      return value ? TAPi18n.__('detailsForm.yes') : TAPi18n.__('detailsForm.no');
    } else {
      return value;
    }
  },
  getProperty(entity, field) {
    if (field.type == 'dropdown') {
      return TAPi18n.__('language._' + entity._id.toUpperCase());
    }

    if (field.key in entity) {
      const value = entity[field.key];

      if (field.type == 'date') {
        if (value != null) {
          const uiFormat = TAPi18n.__('dateFormat.' + field.uiFormat);
          const dbFormat = field.dbFormat;

          return moment(value, dbFormat).format(uiFormat);
        }
        return '';
      }
      return entity[field.key];
    }
  }
});

Template.DetailsForm.onCreated(() => {
  const template = Template.instance(); // TODO: when changing profile email, also change visits

  template.sections = [];
  template.isLoading = new ReactiveVar(true);
  template.noResult = new ReactiveVar(false); // TODO: is this working?
  template.item = new ReactiveVar({});
});

Template.DetailsForm.onRendered(() => {
  $('body').addClass('md-skin');
  $('body').addClass('top-navigation');
  $('body').attr('type', 'DetailsForm');

  const template = Template.instance();
  const data = Template.currentData().data;

  template.sections = data.sections;
  template.getMethod = data.getMethod;

  template.isLoading.set(true);
  template.noResult.set(false);
  template.item.set({});

  loadData(template);

  window.scrollTo(0, 0);
});

Template.DetailsForm.onDestroyed(() => {
  $('body').removeClass('md-skin');
  $('body').removeClass('top-navigation');
  $('body').attr('type', '');
});

Template.DetailsForm.events({
  'click .input:not(.array-item)': (e) => {
    const $e = $(e.target).closest('.input');
    const key = $e.attr('key');
    const link = $e.attr('link');

    if (link != null) {
      let params = FlowRouter.current().params;

      if (key != null) {
        params.key = key;
      }

      FlowRouter.go(FlowRouter.path(link, params));
    } else {
      RouteManager.navigateToUpdate(key);
    }
  },
  'click .input.array-item': (e, template) => {
    e.stopPropagation();
    const $e = $(e.target).closest('.input');
    const clickType = $e.attr('clickType');
    const clickMethod = $e.attr('clickMethod');
    const clickLink = $e.attr('clickLink');
    const entityId = $e.attr('entityId');
    let entityKey = $e.attr('key');

    if (clickType == 'delete') {
      let messagePathParts = clickMethod.split('.');
      messagePathParts.pop();
      messagePathParts.splice(1, 0, 'entity');
      messagePathParts.push(clickType + 'Confirmation');

      let params = FlowRouter.current().params;
      params[entityKey]= entityId;

      if (confirm(TAPi18n.__(messagePathParts.join('.').replace(/_/g, '.')))) {
        Meteor.call(clickMethod, params, entityId, (e, r) => {
          if (e == null) {
            loadData(template);
          } else {
            alert('SERVER ERROR');
          }
        });
      }
    } else if (clickType == 'link') {
      let params = FlowRouter.current().params;
      params[entityKey + 'Id'] = entityId;

      FlowRouter.go(FlowRouter.path(clickLink, params));
    }
  },
  'click tr.array-item': (e) => {
    e.stopPropagation();
    const $tr = $(e.target).closest('tr.array-item');
    const entityKey = $tr.attr('entityKey');
    const entityId = $tr.attr('entityId');
    const entityLink = $tr.attr('entityLink');
    let params = FlowRouter.current().params;
    params[entityKey] = entityId;

    FlowRouter.go(FlowRouter.path(entityLink, params));
  },
  'click .confirm-button': (e) => {
    const key = $(e.target).attr('key');
    const method = $(e.target).attr('method');
    const route = $(e.target).attr('route');

    let messagePathParts = FlowRouter.getRouteName().split('.');
    messagePathParts.pop();
    messagePathParts.splice(1, 0, 'entity');
    messagePathParts.push(key + 'Confirmation');

    if (confirm(TAPi18n.__(messagePathParts.join('.').replace(/_/g, '.')))) {
      Meteor.call(method, FlowRouter.current().params, (e, r) => {
        if (e == null) {
          FlowRouter.go(FlowRouter.path(route, FlowRouter.current().params));
        } else {
          alert('SERVER ERROR');
        }
      });
    }
  }
});

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
