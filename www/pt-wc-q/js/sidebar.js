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
        icon: 'phone',
        contentPage: 'contacts'
      },
      hooks: ['navItemHook'],
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Events',
        icon: 'calendar-alt',
        contentPage: 'events'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Conference',
        icon: 'handshake',
        contentPage: 'conference'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Problems/Diagnoses',
        icon: 'clipboard-list',
        contentPage: 'diagnosis'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Medications',
        icon: 'prescription-bottle-alt',
        contentPage: 'medications'
      }
    },
       {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Allergies',
        icon: 'allergies',
        contentPage: 'allergies'
      }
    },
    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Vaccinations',
        icon: 'syringe',
        contentPage: 'vaccinations'
      }
    },

    {
      componentName: 'ptwq-sidebar-nav-item',
      state: {
        title: 'Vitals',
        icon: 'notes-medical',
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
