import Vessels from '/imports/api/vessels/vessels.js';
import getLanguages from '/imports/api/util/languages.js';

Template['vessel.visit.details'].helpers({
    data() {
        return {
            getMethod: 'vessel.visit.getLast',
            backLink: 'vessel.details',
            sections: [
                {
                    header: 'mainSection',
                    contents: [
                        {
                            key: 'date',
                            type: 'date',
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
                            canUpdate: 'author'
                        }
                    ]
                },
                {
                    header: 'languageSection',
                    contents: [
                        {
                            key: 'languageIds',
                            type: [
                                {
                                    key: 'languageId',
                                    type: 'dropdown',
                                    allowedValues: getLanguages(),
                                    click: {
                                        type: 'delete',
                                        method: 'vessel.visit.language.delete',
                                        canDo: 'author'
                                    }
                                }
                            ]
                        }
                    ],
                    actions: [
                        {
                            key: 'language.new',
                            type: 'link',
                            style: 'primary',
                            route: 'vessel.visit.language.insert',
                            canSee: 'author'
                        }
                    ]
                },
                {
                    header: 'optionSection',
                    actions: [
                        {
                            key: 'delete',
                            type: 'confirm',
                            style: 'danger',
                            method: 'vessel.visit.delete',
                            route: 'vessel.details',
                            canSee: 'author'
                        }
                    ]
                }
            ]
        }
    }
});
