export function define_sidebar() {

  let component = [
    {
      componentName: 'adminui-sidebar-divider',
      state: {
        isTop: true
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Close Patient',
        icon: 'users',
        contentPage: 'patients',
        role: ['admin','staff'],
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
      state: {
        isTop: true
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Summary',
        icon: 'users',
        contentPage: 'psummary'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Patients',
        icon: 'users',
        contentPage: 'patients',
        role: ['admin','staff'],

      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Contacts',
        icon: 'users',
        contentPage: 'contacts'
      },
      hooks: ['navItemHook'],
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Events',
        icon: 'users',
        contentPage: 'events'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Conference',
        icon: 'users',
        contentPage: 'conference'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Problems/Diagnoses',
        icon: 'users',
        contentPage: 'diagnosis'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Medications',
        icon: 'users',
        contentPage: 'medications'
      }
    },
       {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Allergies',
        icon: 'users',
        contentPage: 'allergies'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Vaccinations',
        icon: 'users',
        contentPage: 'vaccinations'
      }
    },

    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Vitals',
        icon: 'users',
        contentPage: 'vitals'
      }
    },
    {
      componentName: 'adminui-sidebar-toggler',
    }
  ];

  let hooks = {
    'ptwq-sidebar-nav-item': {
        navItemHook: function (){

        }
    },
  }
  return {component, hooks};

};
