How to create a Details Page
============================

1. Create `template.jade` file in `/imports/ui/template`

    ```pug
    template(name="template.details")
      +DetailsForm data=data
    ```

1. Create `template.details.js` file in `/imports/ui/template`

    ```javascript
    import { Template } from 'meteor/templating';

    import Languages from '/imports/framework/Constants/Languages';

    Template['template.details'].helpers({
      data: {
        getMethod: 'template.get',
        navigation: {
          backLink: 'dashboard.details', // OPTIONAL
          navbarStyle: 'flat', // OPTIONAL
          hideTitle: true // OPTIONAL
        },
        sections: [{
          key: 'myProjects',
          type: 'array',
          item: {
            key: 'project',
            type: 'link',
            icon: 'group',
            action: {
              type: 'route',
              route: 'project.details'
            }
          }
        }, {
          title: 'mySection', // OPTIONAL
          type: 'header', // OPTIONAL
          contents: [{
            key: 'firstname',
            type: 'text',
            linkedKey: 'profile_firstname', // OPTIONAL
            icon: 'group', // OPTIONAL
            readonly: true // OPTIONAL
          }, {
            key: 'description',
            type: 'textbox',
            linkedKey: 'news_text' // OPTIONAL
          }, {
            key: 'email',
            type: 'email',
            readonly: true // OPTIONAL
          }, {
            key: 'phone',
            type: 'phone',
            readonly: true // OPTIONAL
          }, {
            key: 'dashboard',
            type: 'link',
            route: 'dashboard.details',
            linkedKey: 'toTheDashboard', // OPTIONAL
            icon: 'group' // OPTIONAL
          }, {
            key: 'birthdate',
            type: 'date',
            linkedKey: 'profile_birthdate', // OPTIONAL
            icon: 'group' // OPTIONAL
          }, {
            key: 'gender',
            type: 'dropdown',
            linkedKey: 'profile_gender', // OPTIONAL
            icon: 'group' // OPTIONAL
          }, {
            key: 'visits',
            type: 'array',
            item: {
              key: 'visit',
              link: 'vessel.visit.details',
              type: 'entity',
              rows: [{
                key: 'date',
                type: 'date',
                dbFormat: 'YYYYMMDD',
                uiFormat: 'date'
              }, {
                key: 'languages',
                type: 'text'
              }, {
                key: 'email',
                type: 'email'
              }, {
                key: 'phone',
                type: 'tel'
              }]
            }
          }, {
            key: 'languageIds',
            type: 'array',
            item: {
              key: 'languageId',
              type: 'dropdown',
              allowedValues: Languages.allowedValues,
              action: {
                type: 'method',
                icon: 'trash',
                method: 'vessel.visit.language.delete'
              }
            }
          }]
        }]
      }
    });

    ```

3. Create `service.js` file in `/imports/api/template`

    ```javascript
    import { Meteor } from 'meteor/meteor';

    Meteor.methods({
        'template.get'() {
            return [];
        }
    });
    ```

4. Add route configuration to `/imports/api/routes/projectRoutes.js`

    ```javascript
    RouteManager.registerEntity('template', {
        details: 'template/:id'
    });
    ```

5. Add imports to ```/imports/startup/client/index.js```

    ```javascript
    import '/imports/ui/template/template.jade';
    import '/imports/ui/template/template.details';
    ```

6. Add imports to ```/imports/startup/server/index.js```

    ```javascript
    import '/imports/api/template/service';
    ```

How to add the controls
==========================

- [LinkArray](LinkArray/README.md)
