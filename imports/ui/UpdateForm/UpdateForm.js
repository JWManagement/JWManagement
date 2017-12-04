import './UpdateForm.tpl.jade';
import './UpdateForm.scss';

import './UpdateFormTextInput.js';
import './UpdateFormDropdownInput.js';

Template.UpdateForm.helpers({
    getBackLink() {
        return FlowRouter.path(FlowRouter.getRouteName().replace('update', 'details'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId'),
            itemId: FlowRouter.getParam('itemId')
        });
    },
    isReady() {
        return !Template.instance().isLoading.get() && !Template.instance().noResult.get();
    },
    isText() {
        return Template.instance().inputType == 'text';
    },
    isDropdown() {
        return Template.instance().inputType == 'dropdown';
    },
    getInputData() {
        const template = Template.instance();
        const error = template.error.get();
        const key = FlowRouter.getParam('key');
        const inputData = {
            value: template.value,
            parentInstance: template
        };

        if (error != null) {
            inputData.error = error;
        }

        template.fields.some((field) => {
            if (field.key == key) {
                if ('allowedValues' in field) {
                    inputData.allowedValues = field.allowedValues;
                }
                return true;
            }
        });

        return inputData;
    }
});

Template.UpdateForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.fields = data.fields;
    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.error = new ReactiveVar();
    template.handle = null;
    template.itemId = '';
    template.value = '';
    template.inputType = '';

    template.updateEntity = (value) => {
        const routeName = FlowRouter.getRouteName();
        const itemId = FlowRouter.getParam('itemId');
        const key = FlowRouter.getParam('key');

        Meteor.call(routeName, itemId, key, value, (e) => {
            if (e != null) {
                if (e.error.error == 'validation-error' && e.error.reason.length > 0) {
                    template.error.set(e.error.reason[0].type);
                } else {
                    alert('SERVER ERROR')
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
    const projectId = FlowRouter.getParam('projectId');
    const key = FlowRouter.getParam('key');
    template.itemId = FlowRouter.getParam('itemId');
    template.isLoading.set(true);
    template.noResult.set(true);

    template.handle = Meteor.subscribe(FlowRouter.getRouteName().split('.')[0], template.itemId, projectId);

    template.changeObserver = template.db.find({
        _id: template.itemId
    }).observe({
        added: (newValue) => {
            template.noResult.set(false);
            template.value = newValue[key];
        },
        changed: (oldValue, newValue) => {
            template.value = newValue[key]; // TODO: shouldn't work anyway
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
            if (field.type == 'dropdown') {
                template.inputType = 'dropdown';
            } else if (field.type == Date) {
                template.inputType = 'date';
            } else {
                template.inputType = 'text';
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

Template.UpdateForm.events({
    'submit form': (e) => {
        e.preventDefault();
    }
});
