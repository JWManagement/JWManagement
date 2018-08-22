[Back to DetailsForm](../README.md)

How to use a LinkArray control
==============================

The top-level attribute `key` has to equal the top-level object name on the method answer (in this case `users`).

When using the `route` action, the `item.key` is being concatenated with the `entity._id` on click and added as a parameter to FlowRouter. (In this case `userId: adm`)

CLIENT
------

__details.js__ example:

```javascript
{
  key: 'users',
  type: 'array',
  item: {
    key: 'user',
    type: 'link',
    icon: 'person',
    action: {
      type: 'route',
      route: 'user.details'
    }
  }
}
```

SERVER
------

__service.js__ example:

```javascript
Meteor.methods({
  'users.online.get'() {
    return {
      users: [{
        _id: 'adm',
        user: 'Max Mustermann'
      }]
    };
  }
});
```
