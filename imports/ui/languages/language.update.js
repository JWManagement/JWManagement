Template['language.update'].helpers({
    data() {
        return {
            getMethod: 'language.get',
            backLink: 'language.details',
            fields: [{
                key: 'language',
                type: 'picker',
                allowedValues: SystemLanguages.allowedValues
            }]
        }
    }
});
