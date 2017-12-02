import './InsertFormDateInput.tpl.jade';

Template.InsertFormDateInput.helpers({});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormDateInput.onRendered(() => {
    const template = Template.instance();

    WithModernizr(() => {
        if (!Modernizr.inputtypes.date) {
            template.datepicker = template.$('#datepicker')
            .datepicker({
                maxViewMode: 0,
                weekStart: 1,
                format: 'mm/dd/yyyy',
                language: TAPi18n.getLanguage()
            })
            .datepicker('setDate', new Date());
        }
    });
});

Template.InsertFormDateInput.onDestroyed(() => {});

Template.InsertFormDateInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = $(e.target).val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
