FlowRouter.route('/:language/privacy', {
  name: 'privacy',
  triggersEnter: () => {
    wrs(() => {
      TAPi18n.setLanguage('de');
      FlowRouter.setParams({ language: 'de' });
    });
  },
  action: () => {
    return BlazeLayout.render('blankLayout', { content: 'privacy' });
  }
});

FlowRouter.route('/:language/terms', {
  name: 'terms',
  triggersEnter: () => {
    wrs(() => {
      TAPi18n.setLanguage('de');
      FlowRouter.setParams({ language: 'de' });
    });
  },
  action: () => {
    BlazeLayout.render('blankLayout', { content: 'terms' });
  }
});
