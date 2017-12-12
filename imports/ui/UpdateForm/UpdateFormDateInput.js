Template.UpdateFormDateInput.helpers({});

Template.UpdateFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.valueRaw = data.value;
    template.updateForm = data.parentInstance;
    template.initializing = true;

    if (template.valueRaw != null) {
        if (template.valueRaw == 'today') {
            template.valueFormatted = moment(new Date()).format('YYYY-MM-DD');
        } else {
            template.valueFormatted = moment(template.valueRaw, 'YYYYMMDD').format('YYYY-MM-DD');
        }
    }
});

Template.UpdateFormDateInput.onRendered(() => {
    const template = Template.instance();

    WithModernizr(() => {
        if (Modernizr.inputtypes.date) {
            if (template.valueRaw != null) {
                template.$('.datepicker').attr('value', template.valueFormatted)
            }
        } else {
            const datepicker = template.$('.datepicker').datepicker({
                maxViewMode: 0,
                weekStart: 1,
                format: 'yyyy.mm.dd',
                language: TAPi18n.getLanguage()
            });

            if (template.valueRaw != null) {
                datepicker.datepicker('setDate', template.valueFormatted);
            }
        }

        template.initializing = false;
    });
});

Template.UpdateFormDateInput.onDestroyed(() => {});

Template.UpdateFormDateInput.events({
    'change input': () => {
        const template = Template.instance();

        if (!template.initializing) {
            const value = $('input').val().trim();
            const valueRaw = parseInt(moment(value, 'YYYY-MM-DD').format('YYYYMMDD'));

            if (valueRaw != template.valueRaw) {
                template.valueRaw = valueRaw;
                template.updateForm.updateEntity(valueRaw);
            }
        }
    }
});
