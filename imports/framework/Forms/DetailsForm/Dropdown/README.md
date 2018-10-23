[Back to DetailsForm](../README.md)

How to use a Dropdown control
==============================

CLIENT
------

__details.js__ example:

```javascript
{
  key: 'language',
  type: 'dropdown'
}
```

SERVER
------

__service.js__ example:

```javascript
Meteor.methods({
  'language.get'() {
    return {
      language: 'en'
    };
  }
});
```
