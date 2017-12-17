Template.InsertFormDateInput.helpers({});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;

    if (data.defaultValue != null) {
        if (data.defaultValue == 'today') {
            template.defaultValue = moment(new Date()).format('YYYY-MM-DD');
        } else {
            template.defaultValue = data.defaultValue;
        }
    }
});

Template.InsertFormDateInput.onRendered(() => {
    const template = Template.instance();

    WithModernizr(() => {
        if (Modernizr.inputtypes.date) {
            if (template.defaultValue != null) {
                template.$('.datepicker').attr('value', template.defaultValue)
            }
        } else {
            const datepicker = template.$('.datepicker').datepicker({
                maxViewMode: 0,
                weekStart: 1,
                format: 'yyyy.mm.dd',
                language: TAPi18n.getLanguage()
            });

            if (template.defaultValue != null) {
                datepicker.datepicker('setDate', new Date());
            }
        }
    });

    if (template.defaultValue != null) {
        template.$('.datepicker').change();
    }
});

Template.InsertFormDateInput.onDestroyed(() => {});

Template.InsertFormDateInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = parseInt(moment($(e.target).val().trim(), 'YYYY-MM-DD').format('YYYYMMDD'));

        template.insertForm.setFieldValue(template.key, value);
    }
});
