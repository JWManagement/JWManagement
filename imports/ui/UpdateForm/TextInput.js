import './TextInput.tpl.jade';

Template.TextInput.helpers({
    'getTranslatedKey': () => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', '') + FlowRouter.getParam('key'));
    },
    'getValue': () => {
        return Template.instance().item.get()[FlowRouter.getParam('key')];
    }
});

Template.TextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData();

    template.db = data.db;
    template.templateName = data.templateName;
    template.publicationName = data.publicationName;

    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.language = '';
    template.handle = null;
    template.itemId = '';
    template.item = new ReactiveVar({});
});

Template.TextInput.onRendered(() => {
    var template = Template.instance();

    template.itemId = FlowRouter.getParam('itemId');
    var projectId = FlowRouter.getParam('projectId');

    template.handle = Meteor.subscribe(template.publicationName, template.itemId, projectId);

    template.changeObserver = template.db.find({
        _id: template.itemId
    }).observe({
        added: (newItem) => {
            template.noResult.set(false);
            template.item.set(newItem);
        },
        changed: (oldItem, newItem) => {
            if (template.handle.ready()) {
                template.item.set(newItem);
            }
        }
    });

    Tracker.autorun((tracker) => {
        if (template.handle.ready()) {
            template.isLoading.set(false);
            tracker.stop();
        }
    });
});

Template.TextInput.onDestroyed(() => {
    var template = Template.instance();

    if (template.handle !== null) {
        template.handle.stop();
    }

    if (template.changeObserver !== null) {
        template.changeObserver.stop();
    }
});

Template.TextInput.events({
    'change input': () => {
        var template = Template.instance();
        var isValidating = new ReactiveVar(); // TODO: register in template
        isValidating.set(true);

        var entity = {
            _id: template.itemId,
            projectId: FlowRouter.getParam('projectId'),
            name: $('[name=name]').val().trim(),
            flag: $('[name=flag]').val().trim(),
            callsign: $('[name=callsign]').val().trim(),
            eni: $('[name=eni]').val().trim(),
            imo: $('[name=imo]').val().trim(),
            mmsi: $('[name=mmsi]').val().trim()
        };

        //Meteor.call('VesselService.update', entity, (e, a) => {
            //console.log(e);
            //console.log(a);
            // TODO: handle errors
            // TODO: else handle success
        //});
    }
});
