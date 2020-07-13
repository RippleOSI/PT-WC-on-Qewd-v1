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

  let componentName = 'ptwq-datatables';
  let id_prefix = componentName + '-';
  let counter = -1;
  let labelId;

  class ptwq_datatables extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<div class="table-responsive">
  <table class="table table-bordered" id="${id}" width="100%" style="width:100%" cellspacing="0">
  </table>
</div>
      `;
      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if(state.options){
        this.options = state.options;
      }
      if (state.cls) {
        this.table.classList.add(state.cls);
      }
      if (state.width) {
        this.table.setAttribute('width', state.width);
      }
      if (state.cellspacing) {
        this.table.setAttribute('cellspacing', state.cellspacing);
      }
    }

    onLoaded() {
    }

    render(data) {
      let tableObj = $('#' + this.table.id);
      this.datatable = tableObj.DataTable(data);
      let _this = this;
      $('#' + this.table.id + ' tbody').on('click', 'td', function () {
        if (_this.onCellClicked) _this.onCellClicked.call(_this,  _this.datatable.cell(this));
      });
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.table = this.rootElement.querySelector('table');
      this.childrenTarget = this.table;
      this.name = 'undefined-table-' + counter;
    }

    disconnectedCallback() {
      console.log('*** datatables component was removed!');
      if (this.datatable) this.datatable.destroy();
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_datatables);

}
