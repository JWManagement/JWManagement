[Back to Framework Overview](../../README.md)

How to create a Search Page
============================

1. Create `template.jade` file in `/imports/ui/template`

    ```pug
    template(name="template.search")
      +SearchForm data=data
    ```

1. Create `template.search.js` file in `/imports/ui/template`

    ```javascript
    import { Template } from 'meteor/templating';

    Template['template.search'].helpers({
      data: {
        entityId: 'templateId',
        backLink: 'dashboard.details',
        allowCreate: true,
        columns: [{
          name: '_id',
          visible: false
        }, {
          name: 'name',
          mobile: true
        }, {
          name: 'type',
          type: 'dropdown',
          mobile: true
        }, {
          name: 'mmsi'
        }],
        searchCriteria: (search) => {
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
    ```

3. Create `service.js` file in `/imports/api/template`

    ```javascript
    import { Meteor } from 'meteor/meteor';

    Meteor.methods({
      'vessel.search'({ projectId, searchString, limit }) {
        checkPermissions(projectId);

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
            { name: regEx }
          ]
        }, {
          fields: {
            'name': 1
          },
          sort: {
            name: 1
          },
          limit: limit
        });

        result.total = cursor.count();
        result.items = cursor.fetch();

        return result;
      }
    });
    ```

4. Add route configuration to `/imports/api/routes/projectRoutes.js`

    ```javascript
    RouteManager.registerEntity('template', {
      search: 'templates'
    });
    ```

5. Add imports to ```/imports/startup/client/index.js```

    ```javascript
    import '/imports/ui/template/template.jade';
    import '/imports/ui/template/template.search';
    ```

6. Add imports to ```/imports/startup/server/index.js```

    ```javascript
    import '/imports/api/template/service';
    ```
