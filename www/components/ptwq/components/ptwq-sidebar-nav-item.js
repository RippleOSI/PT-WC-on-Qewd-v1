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

 9 March 2020

 */

export function load() {

  let counter = -1;
  let componentName = 'ptwq-sidebar-nav-item';
  let id_prefix = componentName + '-';

  class ptwq_sidebar_nav_item extends HTMLElement {
    constructor() {
      super();

      counter++;
      let id = id_prefix + counter;

      const html = `
<li id="${id}" class="nav-item">
  <a class="nav-link" href="#">
    <i class="fas fa-fw fa-exclamation-circle"></i>
    <span>Undefined Title</span>
  </a>
</li>
      `;

      this.html = `${html}`;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('li')[0];
      this.style = 'height: 56px';
      let li = this.rootElement;
      this.aTag = li.getElementsByTagName('a')[0];
      this.toggleActive = function() {
        var activeLink = document.getElementsByClassName('nav-item active')[0];
        if (activeLink) activeLink.classList.remove('active');
        if (!li.classList.contains('active')) {
          li.classList.add('active');
        }
      }
      this.aTag.addEventListener('click', this.toggleActive);
    }

    setState(state) {
      let li = this.rootElement;
      let a = this.aTag;
      let i = a.getElementsByTagName('i')[0];
      let span = a.getElementsByTagName('span')[0];

      if (state.title) span.textContent = state.title;
      if (state.icon) {
        let oldIcon = i.classList.item(2);
        i.classList.remove(oldIcon);
        i.classList.add('fa-' + state.icon);
      }
      if (state.active) {
        if (!li.classList.contains('active')) {
          li.classList.add('active');
        }
      }
      else {
        if (li.classList.contains('active')) {
          li.classList.remove('active');
        }
      }
      if (state.contentPage) {
        this.pageSelect = function() {
          console.log('switch to page ' + state.contentPage);
          var root = document.getElementsByTagName('ptwq-root')[0];
          root.switchToPage(state.contentPage);
        };
        this.rootElement.addEventListener('click', this.pageSelect);
      }
      if (state.use_modal) {
        this.rootElement.setAttribute('data-toggle', 'modal');
        let modalRoot = this.getComponentByName('adminui-modal-root', state.use_modal);
        if (modalRoot) this.rootElement.setAttribute('data-target', '#' + modalRoot.rootElement.id);
        if (this.pageSelect) this.rootElement.removeEventListener('click', this.pageSelect);
      }
    }

    disconnectedCallback() {
      console.log('*** nav item single was removed!');
      this.aTag.removeEventListener('click', this.toggleActive);
      if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_sidebar_nav_item);

}

