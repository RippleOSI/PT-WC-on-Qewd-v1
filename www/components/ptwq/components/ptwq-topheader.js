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
<div class="topheader-block align-items-center justify-content-between mb-4 bg-white d-none">
  <div id="contents" class="p-2" style="width: 100%">
   <div class="row">
  <div class="col-sm-8">
    <div class="topheader-patient-name">
        
    </div>
    <div class="topheader-patient-address">
      
    </div>
  </div>
  <div class="col-sm-2">
    <div class="topheader-patient-dob">
      
    </div>
    <div class=" topheader-patient-phone"> 
      
    </div>
  </div>
  <div class="col-sm-2 ">
    <div class="topheader-patient-gender">
     
    </div>
    <div class="topheader-patient-ihi">
    
    </div>
  </div>
</div>

  </div>
</div>
      `;

            this.html = `${html}`;
        }

        setState(state) {
            if (state.name) {
                this.name = state.name;
            }
            if (state.patient) {

                this.rootElement.classList.remove('d-none');
                this.rootElement.classList.add('d-sm-flex');
                let ptn = state.patient;

                this.setLine('name', ptn.firstname + ' ' + ptn.familyname);
                this.setLine('address', ptn.address);
                this.setLine('dob', 'DOB.: ' + ptn.dob);
                this.setLine('phone', 'Phone: ' + ptn.phone);
                this.setLine('gender', 'Gender: ' + ptn.gender);
                this.setLine('ihi', 'IHI No.: ' + ptn.id_uniqueID);

            }else{
                this.rootElement.classList.add('d-none');
                this.rootElement.classList.remove('d-sm-flex');

            }
            if (state.cls) {
                let _this = this;
                this.rootElement.className = '';

                state.cls.split(' ').forEach(function (cls) {

                    _this.rootElement.classList.add(cls);
                });
            }
        }
        setLine(classname, contents){
            this.rootElement
                .querySelector(
                    '.topheader-patient-'
                    + classname
                ).textContent = contents;
            return;
        }

        connectedCallback() {
            this.innerHTML = this.html;
            this.rootElement = this.getElementsByTagName('div')[0];
            this.headerElement = this.rootElement.querySelector('#contents');

            this.childrenTarget = this.rootElement;
        }

        disconnectedCallback() {
            console.log('*** row component was removed!');
            if (this.onUnload) this.onUnload();
        }
    }

    customElements.define(componentName, ptwq_topheader);

}
