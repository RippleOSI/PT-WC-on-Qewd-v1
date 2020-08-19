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

  let componentName = 'ptwq-link';
  let colour = 'btn-primary';

  class ptwq_link extends HTMLElement {
    constructor() {
      super();

      const html = `
<a class="btn btn-primary" href="#" role="button" target="_blank">Link</a>
      `;
      this.html = `${html}`;
    }

    addClass(cls) {
      this.rootElement.classList.add(cls);
    }

    removeClass(cls) {
      this.rootElement.classList.remove(cls);
    }

    setState(state) {
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.colour) {
        this.rootElement.classList.remove(colour);
        colour = 'btn-' + state.colour;
        this.rootElement.classList.add(colour);
      }
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.addClass(cls);
        });
      }
      if (state.icon) {
        if (!this.i) {
          this.rootElement.textContent = '';
          let i = document.createElement('i');
          this.rootElement.appendChild(i);
          this.i = i;
        }
        this.i.className = 'fas fa-' + state.icon;
      }
      if(state.link){
        this.rootElement.href = state.link;
      }
      if (state.use_modal) {
        this.rootElement.setAttribute('data-toggle', 'modal');
        let modalRoot = this.getComponentByName('adminui-modal-root', state.use_modal);
        if (modalRoot) this.rootElement.setAttribute('data-target', '#' + modalRoot.rootElement.id);
      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('a')[0];
    }

    disconnectedCallback() {
      console.log('*** button component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_link);

}
