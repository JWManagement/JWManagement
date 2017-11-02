import './EntityForm.tpl.jade';
import './EntityForm.scss'

module.exports = class EntityForm {
    constructor(
        db,
        templateName,
        publicationName,
        sections
    ) {
        this.isLoading = new ReactiveVar(true);
        this.noResults = new ReactiveVar(true);
        this.language = '';
        this.handle = null;
        this.mode = new ReactiveVar('view');
        this.itemId = '';
        this.item = new ReactiveVar({});

        this.db = db;
        this.templateName = templateName;
        this.publicationName = publicationName;
        this.sections = sections;

        this.registerHelpers();
        this.registerOnCreated();
        this.registerOnRendered();
        this.registerOnDestroyed();
        this.registerEvents();
    }

    registerHelpers() {
        Template.EntityForm.helpers({
            'isLoading': () => {
                return this.isLoading.get();
            },
            'noResults': () => {
                return this.noResults.get() && !this.isLoading.get();
            },
            'isEditMode': () => {
                return this.mode.get() == 'edit';
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
            }
        });
    }

    registerOnCreated() {
        Template.EntityForm.onCreated(() => {});
    }

    registerOnRendered() {
        Template.EntityForm.onRendered(() => {
            $('body').addClass('md-skin');
            $('body').addClass('top-navigation');
            $('body').attr('type', 'EntityForm');

            this.itemId = FlowRouter.getParam('itemId');
            var projectId = FlowRouter.getParam('projectId');

            this.handle = Meteor.subscribe(this.publicationName, this.itemId, projectId);

            this.changeObserver = this.db.find({_id: this.itemId}).observe({
                added: (item) => {
                    this.item.set(item);
                },
                changed: () => {
                    // TODO: to be handled later
                },
                removed: () => {
                    // TODO: to be handled later
                }
            });
        });
    }

    registerOnDestroyed() {
        Template.EntityForm.onDestroyed(() => {
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
        Template.EntityForm.events({
            'click #editEntity': () => {
                this.mode.set('edit');
            },
            'click #cancelEditing': () => {
                this.mode.set('view');
            },
            'click #saveChanges': () => {
                this.mode.set('view');
            }
        });
    }

    doSubscribe() {
        if (this.handle !== null) {
            this.handle.stop();
        }

        var itemId = FlowRouter.getParam('itemId')

        this.handle = Meteor.subscribe(this.publicationName, itemId);
    }
}
