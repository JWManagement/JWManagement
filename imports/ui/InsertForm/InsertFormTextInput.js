import './InsertFormTextInput.tpl.jade';

Template.InsertFormTextInput.helpers({
    'getEntityTranslation': (key) => {
        return TAPi18n.__([
            FlowRouter.getRouteName().split('.')[0],
            'entity',
            key
        ].join('.'));
    },
    'getKey': () => {
        return Template.instance().key;
    }
});

Template.InsertFormTextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormTextInput.onRendered(() => {});

Template.InsertFormTextInput.onDestroyed(() => {});

Template.InsertFormTextInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
