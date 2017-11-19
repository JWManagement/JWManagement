import './UpdateForm.tpl.jade';
import './UpdateForm.scss';

import './TextInput.js';

Template.UpdateForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('update', 'details'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId'),
            itemId: FlowRouter.getParam('itemId')
        });
    },
    'getKeyTranslation': () => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', 'entity.') + FlowRouter.getParam('key'));
    },
    'isText': () => {
        return Template.instance().inputType.get()
    }
});

Template.UpdateForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.publicationName = data.publicationName;
    template.sections = data.sections;

    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.language = '';
    template.handle = null;
    template.itemId = '';
    template.item = new ReactiveVar({});
    template.inputType = new ReactiveVar('');
});

Template.UpdateForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'UpdateForm');

    Template.instance().inputType.set('text');
});

Template.UpdateForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.UpdateForm.events({});
