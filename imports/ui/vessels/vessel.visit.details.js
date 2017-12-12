import { Vessels } from '/imports/api/vessels/vessels.coffee';
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
                            type: 'date'
                        }, {
                            key: 'person',
                            readonly: true
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
                            linkedKey: 'harborId'
                        }, {
                            key: 'harborGroup',
                            readonly: true
                        }, {
                            key: 'country',
                            readonly: true
                        }, {
                            key: 'dateNext',
                            type: 'date'
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
                                    allowedValues: getLanguages()
                                }
                            ]
                        }
                    ],
                    actions: [
                        {
                            key: 'language.new',
                            type: 'link',
                            route: 'vessel.visit.language.insert'
                        }
                    ]
                }
            ]
        }
    }
});
