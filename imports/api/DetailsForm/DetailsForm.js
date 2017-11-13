import './DetailsForm.tpl.jade';
import './DetailsForm.scss';

module.exports = class DetailsForm {
    constructor(
        db,
        templateName,
        publicationName,
        sections
    ) {
        this.db = db;
        this.templateName = templateName;
        this.publicationName = publicationName;
        this.sections = sections;

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
        Template.DetailsForm.helpers({
            'isLoading': () => {
                return this.isLoading.get();
            },
            'noResult': () => {
                return this.noResult.get();
            },
            'sections': () => {
                return this.sections;
            },
            'getTranslatedKey': (key) => {
                return TAPi18n.__(this.templateName + '.' + key);
            },
            'getItemKeyValue': (key) => {
                return this.item.get()[key];
            },
            'getItemKeyDropdown': (key, container) => {
                return TAPi18n.__(this.templateName + '.' + container + '.' + this.item.get()[key]);
            },
            'isDate': (elem) => {
                return elem.type == 'date';
            }
        });
    }

    registerOnRendered() {
        Template.DetailsForm.onRendered(() => {
            $('body').addClass('md-skin');
            $('body').addClass('top-navigation');
            $('body').attr('type', 'DetailsForm');

            this.isLoading.set(true);
            this.noResult.set(false);

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
                    this.item.set(newItem);
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
        Template.DetailsForm.onDestroyed(() => {
            $('body').removeClass('md-skin');
            $('body').removeClass('top-navigation');
            $('body').attr('type', '');

            if (this.handle !== null) {
                this.handle.stop();
            }

            if (this.changeObserver !== null) {
                this.changeObserver.stop();
            }
        });
    }

    registerEvents() {
        Template.DetailsForm.events({
            'click .input': (e) => {
                var key = $(e.target).closest('.input').attr('key');
                FlowRouter.go(FlowRouter.current().path + '/' + key);
            }
        });
    }
}
