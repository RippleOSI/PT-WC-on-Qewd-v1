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

 28 March 2020

*/

export function load() {

  let componentName = 'ptwq-content-card-multibutton-title';

  let counter = -1;
  let id_prefix = componentName + '-';
  let colour = 'btn-primary';

  class ptwq_content_card_multibutton_title extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + 'btn-' + counter;

      const html = `
<div class="row d-flex justify-content-between">
  <div class="col">
    <h6 class="m-0 font-weight-bold text-primary">Undefined Title</h6>
  </div>
  <div class="col childrenTarget" style="display: flex; justify-content: flex-end;" >
  </div>
</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.title) {
        this.titleElement.textContent = state.title;
      }
     if (state.buttonText) {
        this.button.textContent = state.buttonText;
     }
    }

    hideButton() {
      $('#' + this.button.id).parent().hide();
    }

    showButton() {
      if (!this.button.disabled) {
        $('#' + this.button.id).parent().show();
      }
    }

      connectedCallback() {
          this.innerHTML = this.html;
          this.rootElement = this.getElementsByTagName('div')[0];
          this.titleElement = this.rootElement.querySelector('h6');
          this.childrenTarget = this.rootElement.querySelector('.childrenTarget');
          this.button = this.rootElement.querySelector('button');
      }

    disconnectedCallback() {
      //console.log('*** card-button-title component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_content_card_multibutton_title);

}
