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

  let componentName = 'ptwq-breadcumps';

  class ptwq_breadcumps extends HTMLElement {
    constructor() {
      super();

      const html = `
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item" id="homePage"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" id="currentPage" aria-current="page">Library</li>
  </ol>
</nav>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let _this = this;
        state.cls.split(' ').forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
      if (state.currentPage) {
          this.currentPage.textContent = state.currentPage;


      }
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.homePage = this.querySelector('#homePage');
      this.currentPage = this.querySelector('#currentPage');

      this.childrenTarget = this.rootElement;

      this.homePage.addEventListener('click',function (){
        console.log('link click');
        var root = document.getElementsByTagName('ptwq-root')[0];
        root.switchToPage('psummary');
      });
    }

    disconnectedCallback() {
      console.log('*** custom breakcumps component was removed!');
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_breadcumps);

}
