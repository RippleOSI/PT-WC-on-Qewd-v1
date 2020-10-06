#Components Guide 

This document contains explanation what components is included inside PT-WC-Q
build  

All Components placed in `www/components/` folder

## Global Table of Contents 

- [Quick Readme](/README.md)
- [Installation Guide](/docs/installation.md)
- [PT-WC-Q Components](/docs/components.md)
- [How To / Recipe](/docs/how-to.md)
- [CRUD Quickstart](/docs/crud-structure.md)
- [QEWD Main Documentation](/QEWD.md) 
- [REST scope](/REST.md)

## Main Components 

- [Conference](#conference-component) 
- [DataTable](#data-table-component) 
- [Calendar](#calendar-component)
- [Chart component](#chart-component)

### Layout Components

#### Root Template component 

Placed in `www/components/ptwq/components/ptwq-root.js` 

Component is used for provide two column HTML structure based on adminui-root with important changes. 

First one change is page switching main logic that is supports middlewares. Middleware is callback that check 
user page permissions. More details of middleware can be readed at comments of middleware function` www/components/ptwq/components/ptwq-root.js line 291`

___

#### Data table Component 

Placed in `www/components/ptwq/components/ptwq-datatables.js`

Data table component uses js table component from https://datatables.net 

This is main CRUD component that uses for manage records from YottaDB backend 

#### How to init DataTable? 

Example schema for initialization crud component are written above. 
This schema used assembly (route) name - contacts with store data in 'contacts' QEWD route.

    let contactsPageState = {
        assemblyName: 'contacts',
        name: 'contacts',
        title: 'Contacts',
        icon: 'phone',
        summary: {
          title: 'Contacts:',
          titleColour: 'info',
          btnIcon: 'user-plus',
          btnColour: 'success',
          btnTooltip: 'Add a New Contact',
          headers: ['Name', 'Relationship', 'NextOfKin'],
          data_properties: ['name', 'relationship', 'nextOfKin'],
          qewd: {
            getSummary: 'getContacts',
            getDetail: 'getContactInfo',
            delete: 'deleteContact'
          },
          rowBtnIcon: 'user-edit',
          rowBtnColour: 'info',
          enableDelete: true,
          deleteConfirmDisplayColumn: 0
        },
        detail: {
          cardWidth: '500px',
          newRecordTitle: 'Enter New Contact',
          titleColour: 'info',
          btnIcon: 'user-cog',
          btnColour: 'success',
          btnTooltip: 'Edit Contact Details',
          title_data_property: 'name',
          fields: [
            {
              name: 'name',
              data_property: 'name',
              label: 'Name',
              type: 'text',
              labelWidth: 4
            },
            {
              name: 'email',
              data_property: 'email',
              label: 'Email',
              type: 'text',
              labelWidth: 4
            },
            {
              name: 'phone',
              data_property: 'phone',
              label: 'Telephone',
              type: 'text',
              labelWidth: 4
            },
            {
              name: 'relationship',
              data_property: 'relationship',
              label: 'Relationship',
              type: 'select',
              labelWidth: 4,
              options: [
                {text: 'Brother', value: 'Brother'},
                {text: 'Sister', value: 'Sister'},
                {text: 'Not Specified', value: 'N/A'}
              ]
            },
            {
              name: 'relationship_type',
              data_property: 'relationship_type',
              label: 'Relationship Type',
              type: 'select',
              labelWidth: 4,
              options: [
                {text: 'Family', value: 'f'},
                {text: 'Professional', value: 'p'},
                {text: 'Not Specified', value: 'x'}
              ]
            },
            {
              name: 'nextOfKin',
              data_property: 'nextOfKin',
              label: 'Next Of Kin',
              type: 'radios',
              radios: [
                {text: 'Yes', value: true},
                {text: 'No', value: false}
              ]
            } ,
            {
              name: 'contact_info',
              data_property: 'contact_info',
              label: 'Contact Info',
              type: 'textarea',
              labelWidth: 4,
              height: 2
            },
    
            {
              name: 'note',
              data_property: 'note',
              label: 'Note',
              type: 'textarea',
              labelWidth: 4,
              height: 2
            },
            {
              name: 'author',
              data_property: 'author',
              label: 'Author',
              type: 'text',
              labelWidth: 4
            },
          ]
        },
        update: {
          btnText: 'Save',
          btnColour: 'warning',
          qewd: {
            save: 'updateContact'
          }
        }
      };
    
      export {contactsPageState};

After this schema is exported you need to call and import function `crud_assembly` from QEWD and use them.  

More information and samples of usage DataTable component you can check out in [HowTo](./how-to.md)

____

### Calendar Component 

Sources placed in `www/components/fullcalendar/components/fullcalendar-root.js`

Assembly for Calendar CRUD placed in `www/components/ptwq/assembly/ptwq-calendar-assembly.js`

Calendar component used for pull date time data in calendar-look page with supporting switch between regular datatable & calendar view. 
As supportive component we are using [FullCalendar](https://fullcalendar.io)

#### How To init Calendar Component? 

For initiate full calendar render just add this lines in page JSON Schema 

     {
        componentName: 'fullcalendar-root',
        state: {
                height: '300px'
               },
         hooks: ['getFullcalendar']
     }
     
#### Hook example

This sample code demonstrates process of sending data inside of FullCalendar.io PT-WC-Q component with async waiting 
of background rendering results that is presented in QEWD 

      'fullcalendar-root': {
                getFullcalendar: function () {
                    let _this = this;
                    let context = this.context;
    
                    getFullCalendarData(_this, context).then((events)=>{
                        _this.renderFullcalendar(events).then((res)=>{
                            let calendar = _this.getComponentByName('adminui-content-card', state.name + '-events-card')
                            calendar.classList.add('d-none');
                            _this.addEventHandler(function(info){
                                console.log(info);
                                //let id = info.event.id;
                                getDetailsActions.call(_this, info.event.id, _this);
    
                                console.log('event Clicked');
                            },'eventClick');
                        });
                    })
                }
            },

____ 


### Chart Component 

Sources placed in `www/components/adminui/components/adminui-chart.js`

Assembly for CRUD-based pages with Chart.js pages  placed in` www/components/ptwq/assembly/ptwq-chart-assembly.js `

This component are included in `adminui` components list from mgWebComponents sample and uses Chart.js as main library 

Base JS Component: https://www.chartjs.org

#### How use this component? 

For initiate chart.js page render just add this lines in page JSON Schema 

    {
      componentName: 'adminui-chart',
      name: state.name + '-chart',
      hooks: ['getChartData']
    }
                                  
##### Hook sample

     getChartData: function() {
        let _this = this;
        let chartData = store.get('chartX');

        let config = {
          type: 'doughnut',
          data: {
            //labels: ["Direct", "Referral", "Social"],
            labels: chartData.labels,
            datasets: [{
              //data: [55, 30, 15],
              data: chartData.counts,
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
              hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
          },
          options: {
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false
            },
            cutoutPercentage: 80,
            
            onClick: (evt, item) => { // this is standard syntax for ChartJS events
              console.log("evt is " + evt + " & item is: " + item ); // both of these are objects
              
              // as difficult to stringify item (circular object) found this replacer function which helps via cache
              // https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
              var cache = [];
              JSON.stringify(item, (key, value) => {
                  if (typeof value === 'object' && value !== null) {
                    // Duplicate reference found, discard key
                    if (cache.includes(value)) return;

                    // Store value in our collection
                    cache.push(value);
                  }
                  return null;
                  //return value;
               });
               console.log(cache); // we can inspect the cached object from here
               cache = null; //

               // we have used the cache view to inspect the chart object to log these ...
               console.log("Chart Type = " + item[0]._chart.config.type);
               let ix = item[0]._index;
               console.log("ChartIndex = " + ix);
               //console.log("Labels = " + item[0]._chart.config.data.labels); 
               console.log("Label = " + item[0]._chart.config.data.labels[ix]);
               console.log("Data = " + item[0]._chart.config.data.datasets[0].data[ix]);
               let div = _this.getComponentByName('adminui-div', 'chart-detail');
               //div.setState({text: 'added by event - from click from ' + cell.data()});
               div.setState({text: 'Label :' + item[0]._chart.config.data.labels[ix] + " & Data :" + item[0]._chart.config.data.datasets[0].data[ix]});


             }
          },
        };

        this.draw(config);
      }
 
____

### Conference Component

Placed in `www/components/ptwq/components/ptwq-jitsu.js`

This component uses Jitsu library as basics and allow includes conference webRTC app inside of custom page with 
custom parameters. 

Main library are placed in: https://jitsi.org 

#### How to init Jitsu Component 

    {
      componentName: 'ptwq-jitsu',
      state: {
              height: '300px'
              },
      hooks: ['getJitsu']
    }

##### Hook Sample 

     'ptwq-jitsu': {
                 getJitsu: function() {
                     let user = this.context.user;
                     let event = this.context.conference;
     
                     console.log(event);
                     this.renderJitsuMeet({}).then((res)=>{
                         console.group();
                         console.log('console back');
                         console.log(event)
                         console.groupEnd();
                         let randomID;
                         if(!event) {
                              randomID =
                                 Math.random()
                                     .toString(36)
                                     .substring(2, 8) +
                                 "-" +
                                 Math.random()
                                     .toString(36)
                                     .substring(2, 8);
                         }else{
                             randomID = btoa(event.id + event.date + event.comments  + event.service)
                         }
                         console.log("randomID =" + randomID);
                         let block = document.querySelector("#jitsu-meet-window");
                         block.innerHTML = '';
                         const domain = "meet.jit.si";
                         const options = {
                             roomName: "OS-Clinic-Care-SessionID-" + randomID,
                             width: 500,
                             height: 500,
                             parentNode: block,
                             interfaceConfigOverwrite: {
                                 HIDE_INVITE_MORE_HEADER: true,
                                 TOOLBAR_BUTTONS: [
                                     "microphone",
                                     "camera",
                                     "fodeviceselection",
                                     "hangup",
                                     "profile",
                                     "invite",
                                     "chat",
                                     "security",
                                     "help"
                                 ]
                             },
                             //interfaceConfigOverwrite: { filmStripOnly: true },
                             userInfo: {
                                 email: "email@jitsiexamplemail.com",
                                 displayName: "Dr John Doe"
                             }
                         };
                         const api = new JitsiMeetExternalAPI(domain, options);
                         api.executeCommand('displayName', user.name);
     
                         api.executeCommand("subject", "Private Telehealth Session");
     
                         //api.executeCommand("password", "ABC234");
                         //api.executeCommand("toggleFilmStrip");
     
                         console.log(api.getIFrame());
     
                         api.addEventListener("participantJoined", function(event) {
                             console.log("id " + id + "nameX " + displayName);
                         });
     
                         var pass = "ABC2";
                         api.addEventListener("participantRoleChanged", function(event) {
                             // when host has joined the video conference
                             if (event.role == "moderator") {
                                 console.log("this person is a Mod");
                                 //api.executeCommand("password", pass);
                             } else {
                                 setTimeout(() => {
                                     // why timeout: I got some trouble calling event listeners without setting a timeout :)
     
                                     // when local user is trying to enter in a locked room
                                     api.addEventListener("passwordRequired", () => {
                                       //  api.executeCommand("password", pass);
                                     });
     
                                     // when local user has joined the video conference
                                     api.addEventListener("videoConferenceJoined", response => {
                                         setTimeout(function() {
                                            // api.executeCommand("password", pass);
                                         }, 300);
                                     });
                                 }, 10);
                             }
                         });
                         $("#jitsu-meet-configure").click(function() {
                             //$("p").slideToggle();
                             api.executeCommand("toggleFilmStrip");
                             console.log(
                                 "Meeting Link is https://" + domain + "/" + options.roomName
                             );
                             console.log(
                                 Math.random()
                                     .toString(36)
                                     .substring(2, 8) +
                                 "-" +
                                 Math.random()
                                     .toString(36)
                                     .substring(2, 8)
                             );
                         });
     
                         $("#jitsu-meet-start").click(function() {
                             //$("p").slideToggle();
                            // console.log("Setting Password");
                            // api.executeCommand("password", "BBC2");
                         });
                     });
                 }
             }

