export function sidebar_menu_assembly() {

    let component = [
      {
        componentName: 'adminui-sidebar-divider',
        state: {
          isTop: true
        }
      },
      {
        componentName: 'adminui-sidebar-nav-item',
        state: {
          title: 'Person Editor',
          icon: 'user',
          contentPage: 'person',
          active: true
        }
      },
        {
          componentName: 'adminui-sidebar-divider',
        },
        {
            componentName: 'adminui-sidebar-nav-item',
            state: {
              title: 'Logout',
              icon: 'power-off',
              use_modal: 'logout-modal'
            }
          },
          {
            componentName: 'adminui-sidebar-divider',
          },
        {
          componentName: 'adminui-sidebar-toggler',
        }
    ];

    return {component};

  };