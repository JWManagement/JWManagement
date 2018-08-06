import { Meteor } from 'meteor/meteor';

import Vessels from '/imports/api/vessels/Vessels';
import Languages from '/imports/api/dropdowns/Languages';

Meteor.methods({
  'vessel.search': ({ language, projectId, searchString, limit }) => {
    checkVesselModule(projectId);

    const result = {
      total: 0,
      items: []
    };

    if (typeof searchString != 'string' || searchString == '') {
      return result;
    }

    const regEx = new RegExp(searchString, 'i');

    const cursor = Vessels.find({
      $or: [
        { _id: searchString },
        { name: regEx },
        { callsign: regEx },
        { eni: regEx },
        { imo: regEx },
        { mmsi: regEx }
      ]
    }, {
      fields: {
        'name': 1,
        'flag': 1,
        'type': 1,
        'callsign': 1,
        'eni': 1,
        'imo': 1,
        'mmsi': 1
      },
      sort: {
        name: 1
      },
      limit: limit
    });

    result.total = cursor.count();
    result.items = cursor.fetch();

    return result;
  },
  'vessel.get': ({ language, projectId, vesselId }) => {
    checkVesselModule(projectId);

    return getExtendedVessel(vesselId, language);
  },
  'vessel.getField': ({ language, projectId, vesselId, key }) => {
    checkVesselModule(projectId);

    return getExtendedVessel(vesselId, language)[key];
  },
  'vessel.insert': ({ language, projectId }, vessel) => {
    checkVesselModule(projectId);

    try {
      Vessels.persistence.insert(vessel);
      return vessel._id;
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.update': ({ language, projectId, vesselId }, key, value) => {
    checkVesselModule(projectId);

    try {
      Vessels.persistence.update(vesselId, key, value);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.visit.insert': ({ projectId, vesselId }, visit) => {
    checkVesselModule(projectId);

    let visits = Vessels.findOne(vesselId).visits;

    if(visits == null) {
      visits = [];
    }

    visit._id = Random.id();
    visit.projectId = projectId;
    delete visit.userId
    visits.push(visit);

    try {
      Vessels.persistence.update(vesselId, 'visits', visits);
      return visit._id;
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.visit.getAvailableHarbors': ({ projectId }) => {
    checkVesselModule(projectId);

    const project = Projects.findOne(projectId, { fields: { harbors: 1 } })

    return project.harbors
    .map(({ _id, name }) => {
      return { key: _id, value: name };
    })
    .sort((a, b) => {
      if(a.key < b.key) return -1;
      if(a.key > b.key) return 1;
      return 0;
    });
  },
  'vessel.visit.getLast': ({ language, projectId, vesselId }) => {
    checkVesselModule(projectId);

    return getExtendedVessel(vesselId, language).visits.pop();
  },
  'vessel.visit.getField': ({ language, projectId, vesselId, visitId, key }) => {
    checkVesselModule(projectId);

    return getExtendedVessel(vesselId, language).visits.pop()[key];
  },
  'vessel.visit.update': ({ language, projectId, vesselId, visitId }, key, value) => {
    checkVesselModule(projectId);

    const extendedVisits = getExtendedVessel(vesselId, language).visits;

    // only author can update visit
    if (extendedVisits.length == 0 || extendedVisits[0].createdBy != Meteor.userId()) {
      return;
    }

    // only last visit can be updated
    if (visitId != extendedVisits[0]._id) {
      return;
    }

    const visits = Vessels.findOne(vesselId).visits.map((visit) => {
      if (visit._id == visitId) {
        visit[key] = value;
      }
      return visit;
    });

    try {
      Vessels.persistence.update(vesselId, 'visits', visits);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.visit.delete': ({ language, projectId, vesselId, visitId }) => {
    checkVesselModule(projectId);

    const extendedVisits = getExtendedVessel(vesselId, language).visits;

    // only author can delete visit
    if (extendedVisits.length == 0 || extendedVisits[0].createdBy != Meteor.userId()) {
      return;
    }

    // only last visit can be deleted
    if (visitId != extendedVisits[0]._id) {
      return;
    }

    const visits = Vessels.findOne(vesselId).visits.filter((visit) => visit._id != visitId);

    try {
      Vessels.persistence.update(vesselId, 'visits', visits);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.visit.language.insert': ({ language, projectId, vesselId, visitId }, { languageIds }) => {
    checkVesselModule(projectId);

    const extendedVisits = getExtendedVessel(vesselId, language).visits;

    // only author can update visit
    if (extendedVisits.length == 0 || extendedVisits[0].createdBy != Meteor.userId()) {
      return;
    }

    // only last visit can be updated
    if (visitId != extendedVisits[0]._id) {
      return;
    }

    const visits = Vessels.findOne(vesselId).visits.map((visit) => {
      if(visit.languageIds == null) {
        visit.languageIds = [];
      }
      if (visit._id == visitId && visit.languageIds.filter((x) => { return x == languageIds }).length == 0) {
        visit.languageIds.push(languageIds);
      }
      return visit;
    });

    try {
      Vessels.persistence.update(vesselId, 'visits', visits);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'vessel.visit.language.delete': ({ language, projectId, vesselId, visitId }, languageId) => {
    checkVesselModule(projectId);

    const extendedVisits = getExtendedVessel(vesselId, language).visits;

    // only author can update visit
    if (extendedVisits.length == 0 || extendedVisits[0].createdBy != Meteor.userId()) {
      return;
    }

    // only last visit can be updated
    if (visitId != extendedVisits[0]._id) {
      return;
    }

    const visits = Vessels.findOne(vesselId).visits.map((visit) => {
      if (visit._id == visitId) {
        visit.languageIds = visit.languageIds.filter((langId) => langId != languageId);
      }
      return visit;
    });

    try {
      Vessels.persistence.update(vesselId, 'visits', visits);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  }
});

function getExtendedVessel(vesselId, interfaceLanguage = 'en') {
  let vessel = Vessels.findOne(vesselId);

  if (vessel != undefined) {
    if ('visits' in vessel) {
      if (vessel.visits.length > 1) {
        vessel.visits.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
        vessel.visits = [vessel.visits.pop()];
      }

      if (vessel.visits.length > 0) {
        if (vessel.visits[0].isUserVisible) {
          const author = Meteor.users.findOne(vessel.visits[0].createdBy, {
            fields: {
              'profile.firstname': 1,
              'profile.lastname': 1,
              'profile.telefon': 1,
              'profile.email': 1
            }
          });

          vessel.visits[0].person = author.profile.firstname + ' ' + author.profile.lastname;
          vessel.visits[0].email = author.profile.email;
          vessel.visits[0].phone = author.profile.telefon;
        } else {
          vessel.visits[0].person = 'Not visible';
          vessel.visits[0].email = '';
          vessel.visits[0].phone = '';
        }

        const project = Projects.findOne(vessel.visits[0].projectId, {
          fields: {
            country: 1,
            harbors: 1
          }
        });

        vessel.visits[0].country = project.country;

        const harbor = project.harbors.filter((harbor) => {
          return harbor._id == vessel.visits[0].harborId;
        })[0];

        vessel.visits[0].harbor = harbor.name;

        if (vessel.visits[0].languageIds == null) {
          vessel.visits[0].languageIds = [];
        }
        else
        {
          vessel.visits[0].languageIds = vessel.visits[0].languageIds.map((languageId) => {
            return {
              _id: languageId
            };
          });
        }

        const allLanguages = Languages.allowedValues;
        const languages = vessel.visits[0].languageIds
        .filter((language) => allLanguages.indexOf(language._id) > -1)
        .map((language) => TAPi18n.__('language._' + language._id, {}, interfaceLanguage));

        vessel.visits[0].languages = languages.join(', ');
      }
    } else {
      vessel.visits = [];
    }
  }

  return vessel;
}

function checkVesselModule(projectId) {
  const project = Projects.findOne(projectId, { fields: { vesselModule: 1 } })

  if (project == null || project.vesselModule != true) {
    throw new Meteor.Error('projectNotFound');
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
    throw new Meteor.Error('userNotProjectMember');
  }
}
