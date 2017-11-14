import './UpdateForm.tpl.jade';
import './UpdateForm.scss';

const TextInput = require('/imports/ui/TextInput/TextInput.js');

module.exports = class UpdateForm {
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
        this.inputType = new ReactiveVar('');

        this.registerHelpers();
        this.registerOnRendered();
        this.registerOnDestroyed();
        this.registerEvents();
    }

    registerHelpers() {
        Template.UpdateForm.helpers({
            'getBackLink': () => {
                return FlowRouter.path('vessel.details', {
                    language: FlowRouter.getParam('language'),
                    projectId: FlowRouter.getParam('projectId'),
                    itemId: FlowRouter.getParam('itemId')
                });
            },
            'getSectionName': () => {
                return TAPi18n.__(FlowRouter.getRouteName().replace('update', '') + FlowRouter.getParam('key'));
            },
            'isText': () => {
                return this.inputType.get()
            }
        });
    }

    registerOnRendered() {
        Template.UpdateForm.onRendered(() => {
            $('body').addClass('md-skin');
            $('body').addClass('top-navigation');
            $('body').attr('type', 'UpdateForm');

            new TextInput(
                this.db,
                this.templateName,
                this.publicationName);

            this.inputType.set('text');
        });
    }

    registerOnDestroyed() {
        Template.UpdateForm.onDestroyed(() => {
            $('body').removeClass('md-skin');
            $('body').removeClass('top-navigation');
            $('body').attr('type', '');
        });
    }

    registerEvents() {
        Template.UpdateForm.events({});
    }
}
