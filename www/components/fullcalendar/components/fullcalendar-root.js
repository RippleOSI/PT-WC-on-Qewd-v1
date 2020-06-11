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

  customElements.define(componentName, class fullcalendar_root extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })

      const html = `
<span class="full-calendar"></span>
      `;
      this.html = `${html}`;
    }

    loadJS(src, callback) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src
      script.onload = function(){
        if (callback) callback(src);
      };
      this.shadowRoot.appendChild(script);
    }

    onLoaded() {
      let readyEvent = new Event('ready');
      let _this = this;
      let prefix = '';
      if (this.context.fullCalendarResourcePath) prefix = this.context.fullCalendarResourcePath;
      if (this.context.paths && this.context.paths.fullCalendar) {
        prefix = this.context.paths.fullCalendar;
        if (prefix[0] === '.') prefix = prefix.slice(1);
      }
      if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';
      this.loadJS(prefix + 'js/core/main.js', function() {
        _this.loadJS('js/list/main.js',function(){
          var calendar =  new FullCalendar.Calendar(_this.rootElement, {
            plugins: [ 'dayGrid' ]
          });

          _this.FullCalendar = FullCalendar;
          _this.container = calendar;
          document.dispatchEvent(readyEvent);
          calendar.render();

          _this.ready = true;
        });

      });
    }



    onReady(fn) {
      document.addEventListener('full-calendar-listReady', fn);
      this.removeOnReady = function() {
        document.removeEventListener('full-calendar-listReady', fn);
      }
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = this.html;
      this.rootElement = this.shadowRoot.querySelector('span');
      this.childrenTarget = this.rootElement;
      this.console.log('connected callback')
    }

    disconnectedCallback() {
      console.log('*** full calendar was removed');
      if (this.onUnload) this.onUnload();
    }

  });

};
