/*

 ----------------------------------------------------------------------------
 | d3: d3 WebComponents Library                                              |
 |                                                                           |
 | Copyright (c) 2020 M/Gateway Developments Ltd,                            |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | http://www.mgateway.com                                                   |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 21 April 2020

*/

export function load() {

  let componentName = 'fullcalendar-root';
  let count = 0;
  let id_prefix = 'wer';

  customElements.define(componentName, class fullcalendar_root extends HTMLElement {
    constructor() {
      super();

      count++;
      let id = id_prefix + count;
      const html = `
<div id="${id}" style="height: 180px;"></div>
      `;
      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.height) {
        this.rootElement.setAttribute('style', 'height: ' + state.height + ';');
      }
      if (state.accessToken) {
        this.accessToken = state.accessToken;
      }
    }

    onLoaded() {
      this.readyEvent = new Event('mapReady');
      let _this = this;
      let prefix = '';
      if (this.context.fullcalendarResourcePath) prefix = this.context.fullcalendarResourcePath;
      if (this.context.paths && this.context.paths.fullcalendar) {
        prefix = this.context.paths.fullcalendar;
        if (prefix[0] === '.') prefix = prefix.slice(1);
      }
      if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';

      this.loadCSSFile(prefix + 'core/main.css', function() {
        _this.loadCSSFile(prefix + 'list/main.css', function() {
          _this.loadJSFile(prefix + 'core/main.js', function () {
            _this.loadJSFile(prefix + 'list/main.js', function () {
              console.log('all files are loaded')
              _this.fullcalendar = FullCalendar.Calendar;
              _this.isReady();
            });
          });
        });
      });
    }

    renderEvents(eventData, callback) {
      let _this = this;
      let fn = function() {

        let events = eventData.message.summary.map( (el) => { return {
            title: el.name,
            start: el.date,
        }});
        console.log(events);
        console.log(_this.rootElement.id);
        _this.calendar = new _this.fullcalendar(_this.rootElement, {
          plugins: [ 'list' ],
          defaultView: 'listWeek',
          events: events,
        });
        _this.calendar.render();
        if (callback) callback.call(_this);
      }
      if (this.ready) {
        fn();
      }
      else {
        this.onReady(fn);
      }
    }

    renderEventDataPromise(eventData) {
      let _this = this;
      return new Promise((resolve) => {
        _this.renderEvents(eventData, function() {
          resolve(_this);
        });
      });
    }

    async renderFullcalendar(eventData) {
      return await this.renderEventDataPromise(eventData);
    }

    addPopup(text, obj, open) {
      if (obj) {
        if (open) {
          obj.bindPopup(text).openPopup();
        }
        else {
          obj.bindPopup(text);
        }
      }
    }

    addEventHandler(fn, type) {
      type = type || 'click';
      this.calendar.on(type, fn);
      this.calendarEvents.push({
        type: type,
        fn: fn
      });
    }

    onReady(fn) {
      document.addEventListener('mapReady', fn);
      this.removeOnReady = function() {
        document.removeEventListener('mapReady', fn);
      }
    }

    isReady() {
      if (this.readyEvent) {
        document.dispatchEvent(this.readyEvent);
      }
      this.ready = true;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = componentName + '-' + count;
      this.calendarEvents = [];
    }

    disconnectedCallback() {
      if (this.onUnload) this.onUnload();
      let _this = this;
      this.calendarEvents.forEach(function(evnt) {
        _this.calendar.off(evnt.type, evnt.fn);
      });
      if (this.removeOnReady) {
        this.removeOnReady();
      }
    }

  });

};
