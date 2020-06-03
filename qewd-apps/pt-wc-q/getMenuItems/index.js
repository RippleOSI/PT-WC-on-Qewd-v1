module.exports = function(messageObj, session, send, finished) {

  if (messageObj.ref === 'topmenu') {

    var options = [
      {
        componentName: 'adminui-topbar-navbar-menu-item',
        state: {
          title: 'Option 1',
          icon: 'user',
          itemId: 1
        },
        hooks: ['getMenuDetail']
      },
      {
        componentName: 'adminui-topbar-navbar-menu-item',
        state: {
          title: 'Option 2',
          icon: 'cogs',
          itemId: 2
        },
        hooks: ['getMenuDetail']
      },
      {
        componentName: 'adminui-topbar-navbar-menu-divider'
      },
      {
        componentName: 'adminui-topbar-navbar-menu-item',
        state: {
          title: 'Logout',
          icon: 'sign-out-alt',
          use_modal: 'modal-logout'
        }
      }
    ];

    finished({
      ref: messageObj.ref,
      items: options
    });
  }

  else {
    finished({
      ref: messageObj.ref,
      items: []
    });
  }

};
