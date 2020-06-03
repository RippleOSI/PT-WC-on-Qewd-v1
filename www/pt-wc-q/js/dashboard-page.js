export function define_dashboard_page(QEWD) {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'dashboard',
      show: true,
      title: 'Dashboard',
      cardTitle: 'Dashboard Card',
      cardTitleColour: 'danger',
      cardName: 'dashboard-card'
    },
    children: [
      {
        componentName: 'adminui-span',
        state: {
          fragmentName: 'myTestContent.html'
        },
        hooks: ['getFragment']
      }
    ]
  };

  let hooks = {
    'adminui-span': {
      getFragment: function(state) {
        let _this = this;
        QEWD.getFragment({
          name: state.fragmentName,
          targetElement: _this.childrenTarget
        }, function(file) {
        });
      }
    }
  };

  return {component, hooks};

};
