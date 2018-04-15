Template.UpdateFormPickerInput.helpers({
    isAllowedValues() {
        const template = Template.instance();
        return template.allowedValues != null;
    },
    isAllowedKeyValues() {
        const template = Template.instance();
        return template.allowedKeyValuesMethod != null;
    },
    getItems() {
        const template = Template.instance();
        return template.allowedValues;
    },
    getKeyValues() {
        const template = Template.instance();
        return template.allowedKeyValues.get();
    },
    getItemKey() {
        const template = Template.instance();
        const item = Template.currentData();
        return FlowRouter.getParam('key') + 'Values.' + item;
    },
    getSearchEnabledClass() {
        const data = Template.currentData().data;

        if (data.search == true) {
            return 'search-enabled';
        } else {
            return 'search-disabled';
        }
    }
});

Template.UpdateFormPickerInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateForm = data.parentInstance;
    template.allowedValues = data.allowedValues;
    template.allowedKeyValuesMethod = data.allowedKeyValuesMethod;
    template.allowedKeyValues = new ReactiveVar([]);

    if (template.allowedKeyValuesMethod != null) {
        Meteor.call(template.allowedKeyValuesMethod, FlowRouter.current().params, (e, keyValues) => {
            if (e == null) {
                template.allowedKeyValues.set(keyValues);
            } else {
                alert('SERVER ERROR');
            }
        });
    }
});

Template.UpdateFormPickerInput.onRendered(() => {
    const template = Template.instance();

    template.autorun(() => {
        template.allowedKeyValues.get();

        Tracker.afterFlush(() => {
            template.$('select').val(template.value);
        });
    });
});

Template.UpdateFormPickerInput.onDestroyed(() => {});

Template.UpdateFormPickerInput.events({
    'click .item': (e, template) => {
        const value = template.$(e.target).val();

        template.updateForm.updateEntity(value);

        $(e.target).closest('.section').removeClass('has-error');
    }
});
