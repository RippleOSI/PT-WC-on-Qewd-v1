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

 8 March 2020

*/

export function load() {

  let counter = -1;
  let componentName = 'ptwq-content-page';
  let id_prefix = componentName + '-';

  class ptwq_content_page extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="collapse multi-collapse" id="${id}"></div>
      `;
      this.html = `${html}`;
    }

    onLoaded() {
      console.log(this.name + ' page loaded!');
      var root = document.getElementsByTagName('ptwq-root')[0];
      root.setPageActive(this.name);
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.show && !this.rootElement.classList.contains('show')) {
        let children = [...this.parentNode.childNodes];
        children.forEach(function(child) {
          if (child.tagName === 'PTWQ-CONTENT-PAGE') {
            child.rootElement.classList.remove('show');
          }
        });
        this.rootElement.classList.add('show');
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.childrenTarget = this.rootElement;
      this.name = id_prefix + counter;
    }

    disconnectedCallback() {
      console.log('*** page component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_content_page);

}
