export function define_map_page() {

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'map'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Map'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          name: 'map-card'
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Map Card',
              title_colour: 'warning'
            }
          },
          {
            componentName: 'adminui-content-card-body',
            children: [
              {
                componentName: 'leaflet-root',
                state: {
                  accessToken: 'pk.eyJ1Ijoicm9idHdlZWQiLCJhIjoiY2s4cjdtMzJ4MDZjYjNldGw0ZDJ6enFlYiJ9._wfDdoSZ2RGPbtJJIlbRfw',
                  height: '300px'
                },
                hooks: ['getMap']
              }
            ]
          }
        ]
      }
    ]
  };

  let hooks = {
    'leaflet-root': {
      getMap: async function() {
        await this.renderMap(51.505, -0.09, 13);
        this.setMarker(51.505, -0.09);
      }
    }
  };

  return {component, hooks};
};
