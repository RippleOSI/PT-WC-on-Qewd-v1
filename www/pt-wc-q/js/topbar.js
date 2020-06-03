export function define_topbar(QEWD) {

  //          **** topbar ****

  let component = [
    {
      componentName: 'adminui-topbar-toggler'
    },
    {
      componentName: 'adminui-topbar-search',
      state: {
        placeholder: 'enter search..'
      },
      hooks: ['search']
    },
    {
      componentName: 'adminui-topbar-navbar',
      children: [
        {
          componentName: 'adminui-topbar-navbar-dropdown',
          state: {
            ref: 'alerts',
            icon: 'bell',
            title: 'Your Alerts'
          },
          hooks: ['getMessages']
        },
        {
          componentName: 'adminui-topbar-navbar-dropdown',
          state: {
            ref: 'messages',
            icon: 'envelope',
            title: 'Your Messages'
          },
          hooks: ['getMessages']
        },
        {
          componentName: 'adminui-topbar-divider'
        },
        {
          componentName: 'adminui-topbar-navbar-menu',
          state: {
            ref: 'topmenu',
            title: 'Your Options'
          },
          hooks: ['getOptions']
        },
        {
          componentName: 'adminui-topbar-divider'
        },
        {
          componentName: 'adminui-topbar-text',
          state: {
            text: 'My Application',
            colour: 'warning'
          }
        },
        {
          componentName: 'adminui-topbar-divider'
        }
      ]
    }
  ];

  let hooks = {
    'adminui-topbar-search': {
      search: function() {
        let _this = this;
        let fn = function() {
          QEWD.send({
            type: 'search',
            value: _this.searchField.value
          }, function(responseObj) {
            console.log(responseObj);
          });
        };
        this.addHandler(fn, this.searchBtn);
      }
    },
    'adminui-topbar-navbar-dropdown': {
      getMessages: function() {
        let _this = this;
        let fn = function(responseObj) {
          _this.handleItemsUpdate(responseObj.message);
        };
        QEWD.on('getDropdownItems', fn);
        this.onUnload = function() {
          QEWD.off('getDropdownItems', fn);
        }
        QEWD.send({
          type: 'getDropdownItems',
          ref: _this.ref
        });
      }
    },
    'adminui-topbar-navbar-menu': {
      getOptions: function() {
        let _this = this;
        var fn = function(responseObj) {
          _this.handleItemsUpdate(responseObj.message);
        };
        QEWD.on('getMenuItems', fn);
        this.onUnload = function() {
          QEWD.off('getMenuItems', fn);
        }
        QEWD.send({
          type: 'getMenuItems',
          ref: _this.ref
        });
      }
    },
    'adminui-topbar-navbar-menu-item': {
      getMenuDetail: function(state) {
        let _this = this;
        let fn = function() {
          QEWD.send({
            type: 'getMenuDetail',
            ref: state.ref,
            itemId: state.itemId
          }, function(responseObj) {
          });
        };
        this.addHandler(fn, this.aTag);
      }
    }
  };

  return {component, hooks};
};
