import { Meteor } from 'meteor/meteor';
import { Kadira } from 'meteor/lmachens:kadira';

if (Meteor.isProduction) {
  Kadira.connect(process.env.APM_ID, process.env.APM_KEY, { endpoint: 'https://apm-engine.jwmanagement.org' });
} else {
  Kadira.connect('nkGwZQTdTv42wCZbF', 'o6tuGwANmCs3kPq9R', { endpoint: 'https://apm-engine.jwmanagement.org' });
}
