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

 17 April 2020

*/

export function load() {

  let componentName = 'ptwq-root';
  let sidebar_colour = 'bg-gradient-primary';

  class ptwq_root extends HTMLElement {
    constructor() {
      super();

      const html = `
<div id="page-top">
  <div id="loader" class="d-none">
    <div class="loader-animation-container">
        <div class="loader-animation-block">
            <div class="loader-animation-spinner">
            <div class="loader-animation-spinner-reverse">
                        <div class="loader-animation-spinner" style="animation-duration: 0.5s;">
                        </div>
            </div>
            </div>
        </div>        
    </div>
</div>  
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    </ul>
    <!-- End of Sidebar -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav id="bs-admin-topbar" class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top">
        </nav>
        <div id="subheader-content" ></div>
        <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div id="pageContent" class="container-fluid">
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div id="footerContent" class="container my-auto"></div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</div>
      `;

       this.html = `${html}`;

      //this.attachShadow({ mode: 'open' });
      //this.shadowRoot.innerHTML = `${html}`;
    }

    getContentPage(pageName) {
      let children = [...this.contentTarget.childNodes];
      let child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        if (child.tagName === 'PTWQ-CONTENT-PAGE' && child.name === pageName) {
          return child;
        }
      }
    }

    setPageActive(pageName) {
      // set selected page to active
      let page = this.getContentPage(pageName);
      page.setState({show: true});
    }

    switchToPage(pageName) {
      if(this.middlewareArray['WHOLE_WEBSITE']){
        for (const [key, callback] of Object.entries(this.middlewareArray['WHOLE_WEBSITE'])) {

          // Set ptwq-root as main context for middleware
          callback.bind(this);
          console.log(key);

          // Keep exists ptwq-root or change goal page name
          pageName = callback(pageName);
        }
      }

      if(this.middlewareArray[pageName]){
        for (const [key, callback] of Object.entries(this.middlewareArray[pageName])) {

          // Set ptwq-root as main context for middleware
          callback.bind(this);
          console.log(key);

          // Keep exists ptwq-root or change goal page name
          pageName = callback(pageName);
        }
      }

      let config = this.getInstanceFromRegistry(pageName);
      if (config) {
        this.loadGroup(config, this.contentTarget, this.context);
        // setPageActive will get triggered when page config is loaded
      }
    }

    isReady() {
      if (this.context.readyEvent) {
        document.dispatchEvent(this.context.readyEvent);
      }
    }

    setState(state) {
      if (state.sidebar_colour) {
        let target = this.sidebarTarget.classList;
        target.remove(sidebar_colour);
        sidebar_colour = state.sidebar_colour;
        if (!sidebar_colour.includes('-')) sidebar_colour = 'bg-gradient-' + state.sidebar_colour;
        target.add(sidebar_colour);
      }
    }

    onLoaded() {

      this.addMetaTag({
        charset: 'utf-8'
      });
      this.addMetaTag({
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      });
      this.addMetaTag({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      });
      this.addMetaTag({
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      });

      let prefix = '';
      if (this.context.resourcePath) prefix = this.context.resourcePath;
      if (this.context.paths && this.context.paths.adminui) {
        prefix = this.context.paths.adminui;
        if (prefix[0] === '.') prefix = prefix.slice(1);
      }
      if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';

      this.loadCSSFile(prefix + 'css/fontawesome-free/all.min.css');
      this.loadCSSFile('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
      this.loadCSSFile(prefix + 'css/sb-admin/sb-admin-2.min.css');
      this.loadCSSFile(prefix + 'css/toastr/toastr.min.css');
      this.loadCSSFile(prefix + 'css/datatables/dataTables.bootstrap4.min.css');
      this.loadCSSFile(prefix + 'css/datepicker/bootstrap-datepicker3.min.css');

      let _this = this;

      this.loadJSFile(prefix + 'js/chart.js/Chart.min.js', function() {
        _this.loadJSFile(prefix + 'js/chart.js/styling.js');
      });

      let noOfFiles = 5;
      let count = 0;
      this.loadJSFile(prefix + 'js/jquery/jquery.min.js', function() {
        _this.loadJSFile(prefix + 'js/bootstrap/bootstrap.bundle.min.js', function() {
          count++;
          if (count === noOfFiles) _this.isReady();
        });
        _this.loadJSFile(prefix + 'js/bootstrap/bootstrap-input-spinner.js');
        _this.loadJSFile(prefix + 'js/datepicker/bootstrap-datepicker.min.js', function() {
          _this.loadJSFile(prefix + 'js/datepicker/bootstrap-datepicker.en-GB.min.js');
        });
        _this.loadJSFile(prefix + 'js/jquery-easing/jquery.easing.min.js', function() {
          count++;
          if (count === noOfFiles) _this.isReady();
        });
        _this.loadJSFile(prefix + 'js/sb-admin/sb-admin-2.min.js', function() {
          count++;
          if (count === noOfFiles) _this.isReady();
        });
        _this.loadJSFile(prefix + 'js/toastr/toastr.min.js', function() {
          count++;
          if (count === noOfFiles) _this.isReady();
        });
        _this.loadJSFile(prefix + 'js/datatables/jquery.dataTables.min.js', function() {
          _this.loadJSFile(prefix + 'js/datatables/dataTables.bootstrap4.min.js', function() {
            count++;
            if (count === noOfFiles) _this.isReady();
          });
        });
      });
    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.sidebarTarget = this.rootElement.querySelector('#accordionSidebar');
      this.topbarTarget = this.rootElement.querySelector('#bs-admin-topbar');
      this.subheaderTarget = this.rootElement.querySelector('#subheader-content');
      this.contentTarget = this.rootElement.querySelector('#pageContent');
      this.footerTarget = this.rootElement.querySelector('#footerContent');
      this.loader = this.rootElement.querySelector('#loader');
      this.middlewareArray = [];
      this.name = 'root';

    }

    loaderVisibility(show){
      if(show){
        console.log('show loader');
        this.loader.classList.remove('d-none');
      }else{
        console.log('hide loader');

        this.loader.classList.add('d-none');

      }
    }
    /**
     * Register middleware for page swap checking
     * @param page
     * @param uniqueName
     * @param callback function with parameters
     * @param parameters
     */
    registerMiddleware(page, uniqueName , callback, parameters){
        if(!this.middlewareArray[page]){
            this.middlewareArray[page] = [];
        }
        this.middlewareArray[page][uniqueName] = callback;
    }

    removeMiddleware(page, uniqueName){
      if(this.middlewareArray[page] &&
          this.middlewareArray[page][uniqueName]){
        this.middlewareArray[page][uniqueName] = null;
      }
    }



    disconnectedCallback() {
      if (this.onUnload) this.onUnload();
    }
  }

  customElements.define(componentName, ptwq_root);

}
