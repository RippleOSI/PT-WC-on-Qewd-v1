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

  let componentName = 'ptwq-sidebar-nav-menu-popup-option';

  class ptwq_sidebar_nav_menu_popup_option extends HTMLElement {
    constructor() {
      super();

      const html = `
<a class="collapse-item" href="#">Undefined Option</a>
      `;

      this.html = `${html}`;
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('a')[0];
    }

    getParentMenuComponent() {
      function findParent(node) {
        node = node.parentNode;
        if (node.tagName === 'ADMINUI-SIDEBAR-NAV-COLLAPSE-MENU') return node;
        return findParent(node);
      }
      return findParent(this);
    }

    setState(state) {
      var rootElement = this.rootElement;
      if (state.text) rootElement.textContent = state.text;
      if (state.contentPage) {
        let _this = this;
        this.pageSelect = function() {
          console.log('switch to page ' + state.contentPage);
          var root = document.getElementsByTagName('ptwq-root')[0];
          root.switchToPage(state.contentPage);
          var menu = _this.getParentMenuComponent();
          menu.setState({show: false});
        };
        this.rootElement.addEventListener('click', this.pageSelect);
      }
    }

    disconnectedCallback() {
      console.log('*** nav-collapse-menu-popup-option was removed!');
      if (this.pageSelect) this.rootElement.addEventListener('click', this.pageSelect);
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_sidebar_nav_menu_popup_option);

}
