// test for TS development learning

export function load() {

  let componentName = 'tutorial-jcal';
  let count = -1;

  customElements.define(componentName, class tutorial_jcal extends HTMLElement {
    constructor() {
      super();

      count++;

    //this is where we set key html to anchor external component in- we reference the id below in the render function
      const html = `
            <div id="calendarA"></div>
      `;
      this.html = `${html}`;
    }


    // this is used to set state of the component when setting up external page,
    // we can pass this state on
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      // add text
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
    }




    onLoaded(state) {
      // need to set up an event for this with new name
      this.readyEvent = new Event('calReady');
      let _this = this; // this allows us to pass stuff in
      let prefix = ''; // this is needed for setting up context (see leaflet)
   
      // these can be loaded together, one inside the other eg see leaflet version
      this.loadCSSFile(prefix + 'css/jsCalendar.css', function() {
      console.log("loaded JS calender CSS");
  
      });

      //otherwise I am waiting for the key external JS file to declare the component isReady to go
      this.loadJSFile(prefix + 'js/jsCalendar.js', function() {
        _this.calendar = jsCalendar;
        console.log("loaded JS calendar stuff");
        _this.isReady(); 
       
        
       });

     
    }

    
    // this is key to rendering the component/
    // we make it available to invoke from an external JS page for runtime
    // so we customise it for the component
    renderCal(date, options) {
      console.log("trying to render Cal");
      // we set up _this to pass into function  
      let _this= this;

      // now setup core function here
      let fn = function(){
        // we set up the core library object here
        _this.calendar = jsCalendar;
        console.log("need Cal");
        console.log(_this.calendar);
        // we id the key component to assign it to here
        var element = document.getElementById("calendarA");
        // we render it as per syntax & params it expects
        // .new & element are specific to this component 
        //date and options are optional that we have passed in from external JS file
        _this.calendar.new(element,date, options);
        console.log("Calendar rendered");
       };
      /// so here we check if the page is already loaded up and ready and if so we invoke the fxn
      if (this.ready) {
      fn();
      }
      // else we set it up to fire when the page is ready, ie onReady the function is fired

      else {
        this.onReady(fn);
      }
    }  


    // onReady gets ready to carry out action
    // isReady is ready thereafter
    // no modifications made other than eventName 'calReady'
    onReady(fn) {
    console.log("in OnReady too");
    document.addEventListener('calReady', fn);
        this.removeOnReady = function() {
            document.removeEventListener('calReady', fn);
        }
    }

    isReady() {
      if (this.readyEvent) {
        document.dispatchEvent(this.readyEvent);
      }
      console.log("In IsReady");
      this.ready = true; // this lets us know the component is ready to work
     }


    //standard Web Component stuff - not modified this yet
    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = componentName + '-' + count;
    }

    //standard Web Component stuff - not modified this yet
    disconnectedCallback() {
      if (this.onUnload) this.onUnload();
    }

  });
};
