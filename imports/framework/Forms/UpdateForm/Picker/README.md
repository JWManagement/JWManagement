[Back to UpdateForm](../README.md)

How to use a Picker control
==============================

CLIENT
------

__update.js__ example:

```javascript
{
  key: 'role',
  type: 'picker',
  allowedValues: Permissions.member
}
```

SERVER
------

__service.js__ example:

```javascript
Meteor.methods({
  'language.get'() {
    return 'member';
  }
});
```
