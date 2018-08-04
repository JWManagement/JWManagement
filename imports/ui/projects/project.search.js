Template['project.search'].helpers({
  data: {
    entityId: 'projectId',
    backLink: 'dashboard.details',
    columns: [{
      name: '_id',
      visible: false
    }, {
      name: 'name',
      mobile: true
    }],
    searchCriteria: (search, projectId) => {
      return {
        selector: {
          $or: [{
            _id: search
          }, {
            name: search
          }]
        },
        options: {
          sort: {
            name: 1
          }
        }
      };
    }
  }
});
