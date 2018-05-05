import Vessels from '/imports/api/vessels/Vessels.js';
import Languages from '/imports/api/dropdowns/Languages.js';

Template['vessel.visit.details'].helpers({
    data() {
        return {
            getMethod: 'vessel.visit.getLast',
            backLink: 'vessel.details',
            sections: [{
                header: 'main',
                contents: [{
                    key: 'date',
                    type: 'date',
                    dbFormat: 'YYYYMMDD',
                    uiFormat: 'date',
                    canUpdate: 'author'
                }, {
                    key: 'person',
                    linkedKey: 'isUserVisible',
                    canUpdate: 'author'
                }, {
                    key: 'email',
                    type: 'email',
                    readonly: true
                }, {
                    key: 'phone',
                    type: 'tel',
                    readonly: true
                }, {
                    key: 'harbor',
                    linkedKey: 'harborId',
                    canUpdate: 'author'
                }, {
                    key: 'harborGroup',
                    readonly: true
                }, {
                    key: 'country',
                    readonly: true
                }, {
                    key: 'dateNext',
                    type: 'date',
                    dbFormat: 'YYYYMMDD',
                    uiFormat: 'date',
                    canUpdate: 'author'
                }]
            }, {
                header: 'language',
                contents: [{
                    key: 'languageIds',
                    type: [{
                        key: 'languageId',
                        type: 'dropdown',
                        allowedValues: Languages.allowedValues,
                        click: {
                            type: 'delete',
                            method: 'vessel.visit.language.delete',
                            canDo: 'author'
                        }
                    }]
                }],
                actions: [{
                    key: 'language.new',
                    type: 'link',
                    style: 'primary',
                    route: 'vessel.visit.language.insert',
                    canSee: 'author'
                }]
            }, {
                header: 'option',
                actions: [{
                    key: 'delete',
                    type: 'confirm',
                    style: 'danger',
                    method: 'vessel.visit.delete',
                    route: 'vessel.details',
                    canSee: 'author'
                }]
            }]
        }
    }
});
