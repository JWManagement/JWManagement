Template.InsertFormDateInput.helpers({});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormDateInput.onRendered(() => {
    const template = Template.instance();
    const today = moment(new Date()).format('YYYY-MM-DD');

    WithModernizr(() => {
        if (Modernizr.inputtypes.date) {
            template.$('#datepicker').attr('value', today)
        } else {
            template.$('#datepicker').datepicker({
                maxViewMode: 0,
                weekStart: 1,
                format: 'yyyy.mm.dd',
                language: TAPi18n.getLanguage()
            })
            .datepicker('setDate', new Date());
        }
    });

    template.insertForm.setFieldValue(template.key, today);
});

Template.InsertFormDateInput.onDestroyed(() => {});

Template.InsertFormDateInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = $(e.target).val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
