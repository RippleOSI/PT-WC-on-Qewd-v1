export function define_sidebar() {

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
        title: 'Dashboard',
        icon: 'tachometer-alt',
        contentPage: 'dashboard',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-heading',
      state: {
        title: 'Interface'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-collapse-menu',
      state: {
        heading: 'Components',
        icon: 'cog'
      },
      children: [
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Custom Components'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Buttons',
                contentPage: 'buttons'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Cards',
                contentPage: 'cards'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Colours',
                contentPage: 'colours'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Borders',
                contentPage: 'borders'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Animations',
                contentPage: 'animations'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Other',
                contentPage: 'other'
              }
            }
          ]
        },
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'More components'
          },
          children: [

            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Login',
                contentPage: 'login'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Register',
                contentPage: 'register'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Forgot Password',
                contentPage: 'forgot_password'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: '404 Page',
                contentPage: 'page404'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Blank Page',
                contentPage: 'blank'
              }
            }

          ]

        }
      ]
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-heading',
      state: {
        title: 'Core'
      }
    },

    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Charts',
        icon: 'chart-area',
        contentPage: 'charts'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Full Calendar',
        icon: 'table',
        contentPage: 'full_calendar_page'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Tables',
        icon: 'table',
        contentPage: 'tables'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Patients',
        icon: 'users',
        contentPage: 'patients'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Contacts',
        icon: 'users',
        contentPage: 'contacts'
      },
      hooks: ['navItemHook'],
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Events',
        icon: 'users',
        contentPage: 'events'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Problems/Diagnoses',
        icon: 'users',
        contentPage: 'diagnosis'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Medications',
        icon: 'users',
        contentPage: 'medications'
      }
    },
       {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Allergies',
        icon: 'users',
        contentPage: 'allergies'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Vaccinations',
        icon: 'users',
        contentPage: 'vaccinations'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'PSummary',
        icon: 'users',
        contentPage: 'psummary'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Vitals',
        icon: 'users',
        contentPage: 'vitals'
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-nav-collapse-menu',
      state: {
        heading: 'Pages',
        icon: 'folder'
      },
      children: [
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Login Screens'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Login',
                contentPage: 'login'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Register',
                contentPage: 'register'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Forgot Password',
                contentPage: 'forgot_password'
              }
            }
          ]
        },
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Other Pages'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: '404 Page',
                contentPage: 'page404'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Blank Page',
                contentPage: 'blank'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Map Page',
                contentPage: 'map'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Users Page - to DB',
                contentPage: 'users'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                title: 'Node Editor',
                icon: 'map',
                text: 'D3 page',
                contentPage: 'd3'
              }
            }
          ]
        }
      ]
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Logout',
        icon: 'power-off',
        use_modal: 'modal-logout'
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-toggler',
    }
  ];

  let hooks = {
    'adminui-sidebar-nav-item': {
        navItemHook: function (){
          var root = document.getElementsByTagName('adminui-root')[0];
          root.switchToPage('patients');
          console.log('patients234');
        }
    },
  }
  return {component, hooks};

};
