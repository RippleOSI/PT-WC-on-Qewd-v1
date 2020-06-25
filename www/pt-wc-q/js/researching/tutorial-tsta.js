export function load() {

    let componentName = 'tutorial-tsta';
    let count = -1;

    customElements.define(componentName, class tutorial_tsta extends HTMLElement {
        constructor() {
            super();

            count++;

            const html = `
      
      <div id="calendarA"></div>
      `;
            this.html = `${html}`;
        }

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
            this.readyEvent = new Event('calReady');
            let _this = this;
            let prefix = '';

            this.loadCSSFile(prefix + 'css/jsCalendar.css', function() {
                console.log("loaded JS calender CSS");
                //  _this.loadJSFile(prefix + 'js/jsCalendar.js', function() {
                // _this.leaflet = L;
                //   _this.calendar = jsCalendar;


                //   _this.isReady();
                //   console.log("loaded JS calendar stuff");

                //  });
            });

            this.loadJSFile(prefix + 'js/jsCalendar.js', function() {
                // _this.leaflet = L;
                _this.calendar = jsCalendar;

                console.log("loaded JS calendar stuff");
                _this.isReady();


            });




            // this.calendar.goto(state.date);
        }

        // if (this.context.leafletResourcePath) prefix = this.context.leafletResourcePath;
        //  if (this.context.paths && this.context.paths.leaflet) {
        //    prefix = this.context.paths.leaflet;
        //   if (prefix[0] === '.') prefix = prefix.slice(1);
        // }
        // if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';

        //  this.loadCSSFile(prefix + 'css/test2.css', function() {
        //    _this.loadJSFile(prefix + 'js/test1.js', function() {
        // _this.leaflet = L;
        //      console.log("locked and loaded");
        //_this.isReady();
        //    });
        // });
        /*
         renderCal(date, stuff){
          let _this= this;
          let fn= function(){
            //_this.calendar.goto("30/01/2017");
            _this.calendar.new(element, new Date(), {
              monthFormat : "month YYYY",
              dayFormat : "DDD",
          });
          }
          if (this.ready) {
            fn();
          }
          else {
            this.onReady(fn);
          }

        }
    */


        //renderCal2(dayFormatChoice, dateToGoTo){
        //  _this.calendar.new(element, dateToGoTo,{
        //     monthFormat: "month YYYY",
        //     dayFormat: dayFormatChoice
        //  })}
        //  ;

        // renderCal2("DDD", "12/06/1970");

        // async renderMap(lat, long, zoom) {
        //  return await this.renderMapPromise(lat, long, zoom);
        //}

//  async renderCal(date) {
//    _this.calendar = jsCalendar;
//    return await _this.calendar(date);
//  }


        renderCal(date, options) {
            console.log("trying to render Cal");
            let _this= this;
            let fn = function(){
                _this.calendar = jsCalendar;
                console.log("need Cal");
                console.log(_this.calendar);
                var element = document.getElementById("calendarA");
                _this.calendar.new(element,date, options);
                console.log("Calendar rendered");
                //return _this.calendar(date);
            };
            if (this.ready) {
                fn();
            }
            else {
                this.onReady(fn);
            }
        }



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
            this.ready = true;

            // renderCal();
        }

//    let stuff2 = {"key2": "val2"}

        //   renderCal(2323, stuff2 );

        connectedCallback() {
            this.innerHTML = this.html;
            this.rootElement = this.getElementsByTagName('div')[0];
            this.childrenTarget = this.rootElement;
            this.name = componentName + '-' + count;
        }

        disconnectedCallback() {
            if (this.onUnload) this.onUnload();
        }

    });
};
