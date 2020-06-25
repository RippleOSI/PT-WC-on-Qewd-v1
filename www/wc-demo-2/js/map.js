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
      },
      {
        componentName: 'adminui-content-card',
        state: {
          name: 'map-card-detail'
          
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Map Card Detail',
              title_colour: 'warning'
            }
          },
          {
            componentName: 'adminui-content-card-body',
            children: [
              {
                componentName: 'adminui-div',
                state: {
                  name: "map-detail",
                  text: "We will aim for text to go here"
                }
              }
            ]
          },
          {
            componentName: 'adminui-content-card-footer',
            state: {
              hidden: false
            },
            children: [
              {
                componentName: 'adminui-button',
                state: {
                  text: 'ClickIt',
                  colour: 'success',
                  cls: 'btn-block'
                },
                hooks: ['save']
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
      
      console.log("in getMap hook");  
        let _this = this; // ? needed later?

      await this.renderMap(53.355, -6.29, 11);

      let Data = store.get('dataX');

      let userData = Data.data;

      userData.forEach(function(user){
        console.log ("map GPS for user is Lt " + user.address.geo.lat + " Lng " + user.address.geo.lng);
        if (user.address.geo.lat === "undefined" || user.address.geo.lng === "undefined" ) {console.log ("found undefined")}
        console.log(typeof user.address.geo.lat);
        console.log(eval(user.address.geo.lat));
        console.log(eval(user.address.geo.lng));
        _this.setMarker(51.705, -0.07)
        _this.setMarker(eval(user.address.geo.lat), eval(user.address.geo.lng))//.on('click', onClick);;
      });
     /* */

      
        this.setMarker(51.505, -0.09).on('click', onClick);;
        console.log("this is in mapJS hook")
      
        var markerB =new  L.marker([51.510, -0.10]).addTo(this.map).on('click', onClickIT);
        markerB.key = "marker-2";
        markerB.name = "India Place-B"

        function onClickIT(e) {   
          console.log("Key is " + this.key + " & Name is " + this.name); // i can expect my keys here
          let div = _this.getComponentByName('adminui-div', 'map-detail');
          div.setState({text: 'added by event - from click from ' + this.name });
          }



        function onClick(e) {   
          //   alert(this.key); // i can expect my keys here
         console.log("cliked");  
         let div = _this.getComponentByName('adminui-div', 'map-detail');
         div.setState({text: ' ' });
        }


      }
    }
  };

  return {component, hooks};
};
