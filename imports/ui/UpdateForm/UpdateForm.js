import './UpdateForm.tpl.jade';
import './UpdateForm.scss';

import './UpdateFormTextInput.js';
import './UpdateFormDateInput.js';
import './UpdateFormDropdownInput.js';

Template.UpdateForm.helpers({
    getBackLink() {
        return FlowRouter.path(FlowRouter.getRouteName().replace('update', 'details'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId'),
            itemId: FlowRouter.getParam('itemId')
        });
    },
    isText() {
        return Template.instance().inputType.get() == 'text';
    },
    isDate() {
        return Template.instance().inputType.get() == 'date';
    },
    isDropdown() {
        return Template.instance().inputType.get() == 'dropdown';
    },
    textInputData() {
        const template = Template.instance();

        return {
            value: template.value.get(),
            updateEntity: (value) => {
                Meteor.call(
                    FlowRouter.getRouteName(),
                    FlowRouter.getParam('itemId'),
                    FlowRouter.getParam('key'),
                    value);
            }
        }
    },
    dateInputData() {
        const template = Template.instance();

        return {
            value: template.value.get(),
            updateEntity: (value) => {
                Meteor.call(
                    FlowRouter.getRouteName(),
                    FlowRouter.getParam('itemId'),
                    FlowRouter.getParam('key'),
                    value);
            }
        }
    }
});

Template.UpdateForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.fields = data.fields;
    template.isLoading = new ReactiveVar(true); // TODO: add helper for this
    template.noResult = new ReactiveVar(true); // TODO: add helper for this
    template.handle = null;
    template.itemId = '';
    template.value = new ReactiveVar('');
    template.inputType = new ReactiveVar('');
});

Template.UpdateForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'UpdateForm');

    const template = Template.instance();
    const projectId = FlowRouter.getParam('projectId');
    const key = FlowRouter.getParam('key');
    template.itemId = FlowRouter.getParam('itemId');
    template.isLoading.set(true);
    template.noResult.set(false);

    template.handle = Meteor.subscribe(FlowRouter.getRouteName().split('.')[0], template.itemId, projectId);

    template.changeObserver = template.db.find({
        _id: template.itemId
    }).observe({
        added: (newValue) => {
            template.noResult.set(false);
            template.value.set(newValue[key]);
        },
        changed: (oldValue, newValue) => {
            template.value.set(newValue[key]);
        }
    });

    Tracker.autorun((tracker) => {
        if (template.handle.ready()) {
            template.isLoading.set(false);
            tracker.stop();
        }
    });

    template.fields.some((field) => {
        if (field.key == FlowRouter.getParam('key')) {
            if ('dropdown' in field) {
                template.inputType.set('dropdown');
            } else if (field.type == Date) {
                template.inputType.set('date');
            } else {
                template.inputType.set('text');
            }
            return true;
        }
    });
});

Template.UpdateForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');

    const template = Template.instance();

    if (template.handle !== null) {
        template.handle.stop();
    }

    if (template.changeObserver !== null) {
        template.changeObserver.stop();
    }
});
