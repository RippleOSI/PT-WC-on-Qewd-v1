export function define_full_calendar_page(QEWD) {
  console.log('start definition');
  console.log(QEWD);
  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'full_calendar_page',
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
       let result = await  QEWD.reply({
          type: 'getEvents',
          params: {
            properties: ['name', 'date'],
           },
        });

       console.log(result);
        await this.renderFullcalendar(result);
      }
    }
  };
  console.log('enddefinition');
  return {component, hooks};
};
