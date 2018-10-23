[Back to Framework Overview](../../README.md)

How to create a Update Page
============================

1. Create `template.jade` file in `/imports/ui/template`

    ```pug
    template(name="template.update")
      +UpdateForm data=data
    ```

1. Create `template.update.js` file in `/imports/ui/template`

    ```javascript
    import { Template } from 'meteor/templating';

    import Permissions from '/imports/framework/Constants/Permissions';

    Template['publisher.permissions.tag.update'].helpers({
      data: {
        getMethod: 'publisher.permissions.tag.get',
        backLink: 'publisher.permissions.details',
        fields: [{
          key: 'tag',
          type: 'picker',
          allowedValues: Permissions.participant
        }]
      }
    });
    ```

3. Create `service.js` file in `/imports/api/template`

    ```javascript
    import { Meteor } from 'meteor/meteor';

    Meteor.methods({
      'template.update'({ ... all url params here ... }, key, value) {
        // do the update
        return true;
      }
    });
    ```

4. Add route configuration to `/imports/startup/client/routes/projectRoutes.js`

    ```javascript
    RouteManager.registerEntity('template', {
      update: 'template/:id/:key'
    });
    ```

5. Add imports to ```/imports/startup/client/index.js```

    ```javascript
    import '/imports/ui/template/template.jade';
    import '/imports/ui/template/template.update';
    ```

6. Add imports to ```/imports/startup/server/index.js```

    ```javascript
    import '/imports/api/template/service';
    ```

How to add the controls
==========================

- [Picker](Picker/README.md)
