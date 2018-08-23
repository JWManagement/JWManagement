import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { getValue } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers';

import './DetailsForm.Array.LinkSeeAll.jade';

Template.DetailsFormArrayLinkSeeAll.helpers({
  getValue(definition, entity) {

    const array = getValue(definition, entity);
    const moreItemsCount = array.length - definition.maxItemsShown;

    let messagePathParts = FlowRouter.getRouteName().split('.');
    messagePathParts.pop();
    messagePathParts.splice(1, 0, 'entity');
    messagePathParts.push(definition.key);
    messagePathParts.push('seeAllItems');

    return TAPi18n.__(messagePathParts.join('.'), { count: moreItemsCount });
  }
});

Template.DetailsFormArrayLinkSeeAll.onCreated(() => {});

Template.DetailsFormArrayLinkSeeAll.onRendered(() => {});

Template.DetailsFormArrayLinkSeeAll.onDestroyed(() => {});

Template.DetailsFormArrayLinkSeeAll.events({
  'click .input.form-group.array-item'(e) {
    e.stopPropagation();

    const data = Template.currentData();
    let params = FlowRouter.current().params;
    const route = data.definition.allItemsRoute;

    FlowRouter.go(FlowRouter.path(route, params));
  }
});
