/*

 ----------------------------------------------------------------------------
 | admin-ui: SB2-Admin UI Theme WebComponents Library                        |
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

 11 March 2020

*/

export function load() {

  let componentName = 'adminui-content-card-header';

  class adminui_content_card_header extends HTMLElement {
    constructor() {
      super();

      const html = `
<div class="card-header py-3"></div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.title) {
        if (!this.titleElement) {
          let h6 = document.createElement('h6');
          h6.className = 'm-0 font-weight-bold text-primary';
          this.rootElement.appendChild(h6);
          this.titleElement = h6;
        }
        this.titleElement.textContent = state.title;
      }
      if (state.name) {
        this.name = state.name
      }
      if (state.title_colour) {
        if (this.titleElement) {
          let oldColour = this.titleElement.classList.item(2);
          this.titleElement.classList.remove(oldColour);
          this.titleElement.classList.add('text-' + state.title_colour);
        }
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
    }

    onLoaded() {
      let card = this.getParentComponent({match: 'adminui-content-card'});
      card.header = this;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** card header component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, adminui_content_card_header);

}
