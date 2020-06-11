import {webComponents} from '../../mg-webComponents.js';
//import {QEWD} from '../../qewd-client.js';

// import of localstore done in index.html with store.js tool/
// available to all local JS files here, eg blank-page etc

// import the individual component configuration files
//   they can be maintained independently as a result

import {define_login_modal} from './login-modal.js';
//import {define_logout_modal} from './logout-modal.js';
import {define_initial_sidebar} from './initial-sidebar.js';
import {define_sidebar} from './sidebar.js';
import {define_topbar} from './topbar.js';
import {define_footer} from './footer.js';
import {define_dashboard_page} from './dashboard-page.js';
import {define_charts_page} from './charts-page.js';
import {define_tables_page} from './tables-page.js';
import {define_buttons_page} from './buttons-page.js';
import {define_cards_page} from './cards-page.js';
import {define_colours_page} from './colours-page.js';
import {define_borders_page} from './borders-page.js';
import {define_animations_page} from './animations-page.js';
import {define_other_page} from './other-page.js';
import {define_login_page} from './login-page.js';
import {define_register_page} from './register-page.js';
import {define_forgot_password_page} from './forgot-password-page.js';
import {define_404_page} from './404-page.js';
import {define_blank_page} from './blank-page.js';
import {define_demo_page} from './demo-show.js';
import {define_users_page} from './users.js';
import {define_map_page} from './map.js';
//import {define_d3_page} from './d3.js';

import {crud_assembly} from '../../components/adminui/components/adminui-crud.js';


import {contentPage} from './content-page.js';


document.addEventListener('DOMContentLoaded', function() {

  //QEWD.on('ewd-registered', function() {

    //QEWD.log = true;

    // register the custom component definition for contentPage

    webComponents.createCustomComponent('contentPage', contentPage);

    // add each component to the webComponents object
    //  this adds each component to webComponents.component
    //  and adds any hooks to webComponents.hooks

    webComponents.addComponent('login_modal', define_login_modal());
    //webComponents.addComponent('logout_modal', define_logout_modal());
    webComponents.addComponent('initial_sidebar', define_initial_sidebar());
    webComponents.addComponent('sidebar', define_sidebar());
    webComponents.addComponent('topbar', define_topbar());
    webComponents.addComponent('footer', define_footer());
    webComponents.addComponent('dashboard_page', define_dashboard_page());
    webComponents.addComponent('charts_page', define_charts_page());
    webComponents.addComponent('tables_page', define_tables_page());
    webComponents.addComponent('buttons_page', define_buttons_page());
    webComponents.addComponent('cards_page', define_cards_page());
    webComponents.addComponent('colours_page', define_colours_page());
    webComponents.addComponent('borders_page', define_borders_page());
    webComponents.addComponent('animations_page', define_animations_page());
    webComponents.addComponent('other_page', define_other_page());
    webComponents.addComponent('login_page', define_login_page());
    webComponents.addComponent('register_page', define_register_page());
    webComponents.addComponent('forgot_password_page', define_forgot_password_page());
    webComponents.addComponent('page_404', define_404_page());
    webComponents.addComponent('blank_page', define_blank_page());
    webComponents.addComponent('demo_page', define_demo_page());
    //webComponents.addComponent('users_page', define_users_page());
    webComponents.addComponent('map_page', define_map_page());
   // webComponents.addComponent('d3_page', define_d3_page());

    webComponents.setLog(true);

    let userPageState = {
      name: 'users',
      title: 'Users',
      summary: {
        title: 'Current Users',
        titleColour: 'info',
        btnIcon: 'user-plus',
        btnColour: 'success',
        btnTooltip: 'Add a New User',
        headers: ['Name', 'Email'],
        data_properties: ['name', 'email'],
        //qewd: {
        //  getSummary: 'getUsers',
        ////  getDetail: 'getUserInfo',
        // delete: 'deleteUser'
        //},
        rowBtnIcon: 'user-edit',
        rowBtnColour: 'info',
        enableDelete: true,
        deleteConfirmDisplayColumn: 0
      },
      detail: {
        cardWidth: '500px',
        newRecordTitle: 'Enter New User',
        titleColour: 'info',
        btnIcon: 'user-cog',
        btnColour: 'success',
        btnTooltip: 'Edit User Details',
        title_data_property: 'name',
        fields: [
          {
            name: 'name',
            data_property: 'name',
            label: 'Name',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'email',
            data_property: 'email',
            label: 'Email',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'username',
            data_property: 'username',
            label: 'Username',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'phone',
            data_property: 'phone',
            label: 'Telephone',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'gender',
            data_property: 'gender',
            label: 'Gender',
            type: 'select',
            labelWidth: 4,
            options: [
              {text: 'Male', value: 'm'},
              {text: 'Female', value: 'f'},
              {text: 'Not Specified', value: 'x'}
            ]
          },
          {
            name: 'userType',
            data_property: 'userType',
            label: 'Type of User',
            type: 'radios',
            radios: [
              {text: 'Administrator', value: 'admin'},
              {text: 'Public', value: 'public'},
              {text: 'Not Specified', value: 'x'}
            ]
          },
          {
            name: 'roles',
            data_property: 'roles',
            label: 'Roles',
            type: 'checkboxes',
            checkboxes: [
              {text: 'Doctor', value: 'doctor'},
              {text: 'Patient', value: 'patient'},
              {text: 'Carer', value: 'carer'},
              {text: 'Consultant', value: 'consultant'}
            ]
          },
          {
            name: 'age',
            data_property: 'age',
            label: 'Age',
            type: 'range',
            labelWidth: 3,
            min: 0,
            max: 100,
            marker: true
          },
          {
            name: 'prevEmp',
            data_property: 'prevEmp',
            label: 'Previous Employers',
            type: 'multiselect',
            options: [
              {text: 'NHS', value: 'nhs'},
              {text: 'Private Hospital', value: 'private'},
              {text: 'Community', value: 'community'},
              {text: 'GP Practice', value: 'gp'}
            ]
          },
          {
            name: 'comments',
            data_property: 'comments',
            label: 'Comments',
            type: 'textarea',
            labelWidth: 4,
            height: 6
          }
        ]
      },
      update: {
        btnText: 'Save',
        btnColour: 'warning',
        //qewd: {
        //  save: 'updateUser'
        //}
      }
    };

   // webComponents.addComponent('users_page', crud_assembly(QEWD, userPageState));

    // create the context for running the web components

    let context = {
      paths: {
        adminui: './components/adminui/',
        leaflet: './components/leaflet/',
        //d3: './components/d3'
      },
      readyEvent: new Event('ready')
    };

    // this mainview function will be used by the login hook - it will pick it up
    // from the context object

    function loadMainView() {
      let body = document.getElementsByTagName('body')[0];
      let root = webComponents.getComponentByName('adminui-root', 'root');
      let components = webComponents.components;
      webComponents.loadGroup(components.sidebar, root.sidebarTarget, context);
      webComponents.loadGroup(components.topbar, root.topbarTarget, context);
      webComponents.loadGroup(components.dashboard_page, root.contentTarget, context);
      // webComponents.loadGroup(components.logout_modal, body, context);
    }
    context.loadMainView = loadMainView;

    //webComponents.setLog(true);

    // register the content page configurations, ready for lazy loading on demand
    //  this makes them accessible via the contentPage state values (see sidebar component)

    webComponents.register('dashboard', webComponents.components.dashboard_page);
    webComponents.register('charts', webComponents.components.charts_page);
    webComponents.register('tables', webComponents.components.tables_page);
    webComponents.register('buttons', webComponents.components.buttons_page);
    webComponents.register('cards', webComponents.components.cards_page);
    webComponents.register('colours', webComponents.components.colours_page);
    webComponents.register('borders', webComponents.components.borders_page);
    webComponents.register('animations', webComponents.components.animations_page);
    webComponents.register('other', webComponents.components.other_page);
    webComponents.register('login', webComponents.components.login_page);
    webComponents.register('register', webComponents.components.register_page);
    webComponents.register('forgot_password', webComponents.components.forgot_password_page);
    webComponents.register('page404', webComponents.components.page_404);
    webComponents.register('blank', webComponents.components.blank_page);
    webComponents.register('demo', webComponents.components.demo_page);
    webComponents.register('users', webComponents.components.users_page);
    webComponents.register('map', webComponents.components.map_page);
    //webComponents.register('d3', webComponents.components.d3_page);

    // set up the initial display prior to login

    let body = document.getElementsByTagName('body')[0];

    // The handler below is needed to ensure that all the JS resources are loaded before attempting
    // to show the modal, since this depends on jQuery being ready

    // The ready event is dispatched by the admin-root component
    //  It is available to the admin-root component via the context object which
    //  includes the ready event object

    //document.addEventListener('ready', function() {
    //  let modal = webComponents.getComponentByName('adminui-modal-root', 'modal-login');
    //  modal.show();
    //});

    // now load up the initial view

    webComponents.loadWebComponent('adminui-root', body, context, function(root) {
      let components = webComponents.components;
      webComponents.loadGroup(components.sidebar, root.sidebarTarget, context);
      //webComponents.loadGroup(components.login_modal, body, context);
      webComponents.loadGroup(components.footer, root.footerTarget, context);
    });

  //});

  //QEWD.start({
  //  application: 'demo'
  //});

});
