import './UpdateForm.jade';
import './UpdateForm.scss';

import './UpdateFormTextInput.js';
import './UpdateFormDropdownInput.js';

Template.UpdateForm.helpers({
    getBackLink() {
        return FlowRouter.path(Template.instance().backLink.get(), FlowRouter.current().params);
    },
    isReady() {
        return !Template.instance().isLoading.get() && !Template.instance().noResult.get();
    },
    isText() {
        return Template.instance().inputData.get().type == 'text';
    },
    isDropdown() {
        return Template.instance().inputData.get().type == 'dropdown';
    },
    getInputData() {
        return Template.instance().inputData.get();
    }
});

Template.UpdateForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.backLink = new ReactiveVar('');
    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.error = new ReactiveVar({});
    template.inputData = new ReactiveVar({});
    template.inputType = new ReactiveVar('');

    template.updateEntity = (value) => {
        const routeName = FlowRouter.getRouteName();
        const entityId = FlowRouter.getParam('entityId');
        const key = FlowRouter.getParam('key');

        Meteor.call(routeName, entityId, key, value, (e) => {
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
    const data = Template.currentData().data;

    template.backLink.set(data.backLink);
    template.isLoading.set(true);
    template.noResult.set(true);
    template.error.set({});
    template.inputData.set({});

    Meteor.call(data.getMethod, FlowRouter.current().params, (e, value) => {
        if (e == null) {
            const inputData = template.inputData.get();
            inputData.value = value;
            template.inputData.set(inputData);
            template.noResult.set(false);
            template.isLoading.set(false);
        } else {
            alert('SERVER ERROR')
        }
    });

    data.fields.some((field) => {
        if (field.key == FlowRouter.getParam('key')) {
            const inputData = template.inputData.get();
            inputData.type = 'text';

            if (field.type == 'dropdown') {
                inputData.type = 'dropdown';

                if ('allowedValues' in field) {
                    inputData.allowedValues = field.allowedValues;
                } else if ('allowedKeyValues' in field) {
                    inputData.allowedKeyValues = field.allowedKeyValues;
                }
            } else if (field.type == 'date') {
                inputData.type = 'date';
            }

            template.inputData.set(inputData);
            return true;
        }
    });
});

Template.UpdateForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.UpdateForm.events({
    'submit form': (e) => {
        e.preventDefault();
    }
});
