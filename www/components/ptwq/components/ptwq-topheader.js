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

  let componentName = 'ptwq-topheader';

  class ptwq_topheader extends HTMLElement {
    constructor() {
      super();

      const html = `
<div class="align-items-center justify-content-between mb-4 bg-white d-none">
  <h4 class="h5 mb-0 text-gray-800 pt-5 pb-5 pr-1 pl-1">Undefined Header</h4>
</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if(state.title){
        this.headerElement.textContent = state.title;
        this.rootElement.classList.remove('d-none');
        this.rootElement.classList.add('d-sm-flex');
      }
      if (state.cls) {
        let _this = this;
        this.rootElement.className = '';

        state.cls.split(' ').forEach(function(cls) {

          _this.rootElement.classList.add(cls);
        });
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.headerElement = this.rootElement.querySelector('h4');

      this.childrenTarget = this.rootElement;
    }

    disconnectedCallback() {
      console.log('*** row component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_topheader);

}
