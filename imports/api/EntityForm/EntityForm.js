import './EntityForm.tpl.jade';
import './EntityForm.scss'

module.exports = class EntityForm {
    constructor(
        db,
        templateName,
        publicationName
    ) {
        this.isLoading = new ReactiveVar(true);
        this.noResults = new ReactiveVar(true);
        this.language = '';
        this.handle = null;
        this.mode = 'edit';

        this.db = db;
        this.templateName = templateName;
        this.publicationName = publicationName;

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
            }
        });
    }

    registerOnCreated() {
        Template.EntityForm.onCreated(() => {
            this.isLoading.set(true);
            this.noResults.set(true);

            Tracker.autorun(() => {
                var tempLanguage = FlowRouter.getParam('language');

                if (this.language !== tempLanguage) {
                    this.language = tempLanguage;

                    // TODO: do stuff
                }
            });

            return this.db.find().observeChanges({
                changed: () => {
                    // TODO: show warning
                },
                removed: () => {
                    // TODO: show error
                }
            });
        });
    }

    registerOnRendered() {
        Template.EntityForm.onRendered(() => {
            $('body').addClass('md-skin');
            $('body').addClass('top-navigation');
            $('body').attr('type', 'EntityForm');
        });
    }

    registerOnDestroyed() {
        Template.EntityForm.onDestroyed(() => {
            $('body').removeClass('md-skin');
            $('body').removeClass('top-navigation');
            $('body').attr('type', '');
        });
    }

    registerEvents() {
        Template.EntityForm.events({
            // TODO: super events
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
