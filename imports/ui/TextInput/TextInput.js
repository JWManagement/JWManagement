import './TextInput.tpl.jade';
import './TextInput.scss';

module.exports = class TextInput {
    constructor(
        db,
        templateName,
        publicationName
    ) {
        this.db = db;
        this.templateName = templateName;
        this.publicationName = publicationName;

        this.isLoading = new ReactiveVar(true);
        this.noResult = new ReactiveVar(true);
        this.language = '';
        this.handle = null;
        this.itemId = '';
        this.item = new ReactiveVar({});

        this.registerHelpers();
        this.registerOnRendered();
        this.registerOnDestroyed();
        this.registerEvents();
    }

    registerHelpers() {
        console.log('registerHelpers');
        Template.TextInput.helpers({
            'getTranslatedKey': () => {
                console.log('getTranslatedKey2');
                return TAPi18n.__(FlowRouter.getRouteName().replace('update', '') + FlowRouter.getParam('key'));
            },
            'getValue': () => {
                return this.item.get()[FlowRouter.getParam('key')];
            }
        });
    }

    registerOnRendered() {
        Template.TextInput.onRendered(() => {
            this.itemId = FlowRouter.getParam('itemId');
            var projectId = FlowRouter.getParam('projectId');

            this.handle = Meteor.subscribe(this.publicationName, this.itemId, projectId);

            this.changeObserver = this.db.find({
                _id: this.itemId
            }).observe({
                added: (newItem) => {
                    this.noResult.set(false);
                    this.item.set(newItem);
                },
                changed: (oldItem, newItem) => {
                    if (this.handle.ready()) {
                        this.item.set(newItem);
                    }
                }
            });

            Tracker.autorun((tracker) => {
                if (this.handle.ready()) {
                    this.isLoading.set(false);
                    tracker.stop();
                }
            });
        });
    }

    registerOnDestroyed() {
        Template.TextInput.onDestroyed(() => {
            if (this.handle !== null) {
                this.handle.stop();
            }

            if (this.changeObserver !== null) {
                this.changeObserver.stop();
            }
        });
    }

    registerEvents() {
        Template.TextInput.events({
            'change input': () => {
                var isValidating = new ReactiveVar(); // TODO: register in class
                isValidating.set(true);

                var entity = {
                    _id: this.itemId,
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
    }
}
