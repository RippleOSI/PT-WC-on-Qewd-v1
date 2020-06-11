export function define_fullcalendar_page() {
  console.log('start definition');
  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'users',
      crud_params: {
        title: 'Users'
      }
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Fullcalendar'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          name: 'fullcalendar-card'
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Fullcalendar Card',
              title_colour: 'warning'
            }
          },
          {
            componentName: 'adminui-content-card-body',
            children: [
              {
                componentName: 'fullcalendar-root',
                state: {
                  accessToken: 'pk.eyJ1Ijoicm9idHdlZWQiLCJhIjoiY2s4cjdtMzJ4MDZjYjNldGw0ZDJ6enFlYiJ9._wfDdoSZ2RGPbtJJIlbRfw',
                  height: '300px'
                },
                hooks: ['getFullcalendar']
              }
            ]
          }
        ]
      }
    ]
  };

  let hooks = {
    'fullcalendar-root': {
      getFullcalendar: async function() {
        await this.renderFullcalendar(51.505, -0.09, 13);
        this.setMarker(51.505, -0.09);
      }
    }
  };
  console.log('enddefinition');
  return {component, hooks};
};
