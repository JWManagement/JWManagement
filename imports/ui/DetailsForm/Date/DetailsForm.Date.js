import moment from 'moment';

import './DetailsForm.Date.jade';

import { getValue, getKey } from '../DetailsForm';

Template.DetailsFormDate.helpers({
    getKey,
    getValue(definition, entity) {
        const value = getValue(definition, entity);

        if (!value) {
            return '';
        } else {
            const uiFormat = TAPi18n.__('dateFormat.' + definition.uiFormat);
            const dbFormat = definition.dbFormat;

            return moment(value, dbFormat).format(uiFormat);
        }
    }
});

Template.DetailsFormDate.onCreated(() => {});

Template.DetailsFormDate.onRendered(() => {});

Template.DetailsFormDate.onDestroyed(() => {});

Template.DetailsFormDate.events({});
