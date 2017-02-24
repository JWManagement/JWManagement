App.info({
  id: 'org.jwmanagement',
  name: 'JWManagement',
  description: 'A highly configurable shift management system for Jehovah\'s Witnesses. Built to power projects like the metropolitan witnessing, construction projects and/or similar',
  author: 'JW Developer',
  email: 'support@jwmanagement.org',
  website: 'https://www.jwmanagement.org'
});

App.icons({
  'iphone_2x': 'public/favicon/apple-touch-icon-120x120.png',
  'iphone_3x': 'public/favicon/apple-touch-icon-180x180.png',
  'ipad': 'public/favicon/apple-touch-icon-76x76.png',
  'ipad_2x': 'public/favicon/apple-touch-icon-152x152.png',
  'ipad_pro': 'public/favicon/apple-touch-icon-180x180.png',
  'android_mdpi': 'public/favicon/android-chrome-48x48.png',
  'android_hdpi': 'public/favicon/android-chrome-72x72.png',
  'android_xhdpi': 'public/favicon/android-chrome-96x96.png',
  'android_xxhdpi': 'public/favicon/android-chrome-144x144.png',
  'android_xxxhdpi': 'public/favicon/android-chrome-192x192.png'
});

//App.launchScreens({});

App.setPreference('BackgroundColor', '0xff3f51b5');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.accessRule("blob:*");

App.configurePlugin('phonegap-plugin-push', { SENDER_ID: 12341234 });
