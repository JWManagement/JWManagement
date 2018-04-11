Template.InsertFormDateInput.helpers({});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;
    const dateFormat = TAPi18n.__('dateFormat.default');

    template.key = data.key;
    template.format = data.format || 'YYYYMMDD';
    template.insertForm = data.parentInstance;

    if (data.defaultValue != null) {
        if (data.defaultValue == 'today') {
            template.defaultValue = moment(new Date()).format(dateFormat);
        } else {
            template.defaultValue = data.defaultValue;
        }
    }
});

Template.InsertFormDateInput.onRendered(() => {
    const template = Template.instance();
    const dateFormat = TAPi18n.__('dateFormat.default');
    const $weekPicker = $('#datepicker-week');

    $weekPicker.datepicker({
        calendarWeeks: true,
        maxViewMode: 0,
        weekStart: 1,
        language: TAPi18n.getLanguage()
    })
    .datepicker('setDate', nextWeek);

    /*
    WithModernizr(() => {
        if (Modernizr.inputtypes.date) {
            if (template.defaultValue != null) {
                template.$('.datepicker').attr('value', template.defaultValue).change();
            }
        } else {
            const datepicker = template.$('.datepicker').datepicker({
                maxViewMode: 0,
                weekStart: 1,
                format: dateFormat,
                language: TAPi18n.getLanguage()
            });

            if (template.defaultValue != null) {
                datepicker.datepicker('setDate', new Date()).change();
            }
        }
    });
    */
});

Template.InsertFormDateInput.onDestroyed(() => {});

Template.InsertFormDateInput.events({
    'change input': (e, template) => {
        const dateFormat = TAPi18n.__('dateFormat.default');
        const value = parseInt(moment($(e.target).val().trim(), dateFormat).format(template.format));

        console.log(value);

        template.insertForm.setFieldValue(template.key, value);
    }
});
