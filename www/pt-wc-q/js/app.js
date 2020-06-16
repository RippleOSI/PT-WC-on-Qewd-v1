// Change the paths below if needed

import {webComponents} from '../../mg-webComponents.js';
import {QEWD} from '../../qewd-client.js';

// import the individual component configuration files
//   they can be maintained independently as a result

import {define_login_modal} from './login-modal.js';
import {define_logout_modal} from './logout-modal.js';
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
//import {define_medications_page} from './medications.js'
import {define_map_page} from './map.js';
//import {define_d3_page} from './d3.js';
import {define_full_calendar_page} from './researching/full-calendar.js';

import {crud_assembly} from '../../components/adminui/components/adminui-crud.js';
import {userPageState} from './user_state.js';

import {patientsPageState} from './patients_page_state.js'
import {contactsPageState} from './contacts_page_state.js';
import {medicationsPageState} from './medications_page_state.js';
import {diagnosisPageState} from './diagnosis_page_state.js'
import {allergiesPageState} from './allergies_page_state.js'
import {vaccinationsPageState} from './vaccinations_page_state.js'
import {vitalsPageState} from './vitals_page_state.js'
import {eventsPageState} from './events_page_state.js'
import {contentPage} from './content-page.js';
//import { contactsPageState } from './contacts_page_state.js';



document.addEventListener('DOMContentLoaded', function() {

  QEWD.on('ewd-registered', function() {

    QEWD.log = true;

    // register the custom component definition for contentPage

    webComponents.createCustomComponent('contentPage', contentPage);

    // add each component to the webComponents object
    //  this adds each component to webComponents.component
    //  and adds any hooks to webComponents.hooks
    webComponents.addComponent('login_modal', define_login_modal(QEWD));
    webComponents.addComponent('logout_modal', define_logout_modal(QEWD));
    webComponents.addComponent('initial_sidebar', define_initial_sidebar());
    webComponents.addComponent('sidebar', define_sidebar());
    webComponents.addComponent('topbar', define_topbar(QEWD));
    webComponents.addComponent('footer', define_footer());
    webComponents.addComponent('dashboard_page', define_dashboard_page(QEWD));
    webComponents.addComponent('charts_page', define_charts_page(QEWD));
    webComponents.addComponent('tables_page', define_tables_page(QEWD));
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
    webComponents.addComponent('map_page', define_map_page(QEWD));
   // webComponents.addComponent('d3_page', define_d3_page(QEWD));

    webComponents.addComponent('users', crud_assembly(QEWD, userPageState));
    webComponents.addComponent('full_calendar_page', define_full_calendar_page(QEWD));

// when invoking addComponent for crud_assembly - use the name from the assemblyName aspect of the State

    webComponents.addComponent('patients', crud_assembly(QEWD, patientsPageState));

    webComponents.addComponent('contacts', crud_assembly(QEWD, contactsPageState));
    webComponents.addComponent('diagnosis', crud_assembly(QEWD, diagnosisPageState));
    webComponents.addComponent('medications', crud_assembly(QEWD, medicationsPageState));
    webComponents.addComponent('allergies', crud_assembly(QEWD, allergiesPageState));
    webComponents.addComponent('vaccinations', crud_assembly(QEWD, vaccinationsPageState));
    webComponents.addComponent('vitals', crud_assembly(QEWD, vitalsPageState));
    webComponents.addComponent('events', crud_assembly(QEWD, eventsPageState));

    // when invoking addComponent for crud_assembly - use the name from the assemblyName aspect of the State
/*
    */

    // create the context for running the web components

    let context = {
      paths: {
        adminui: './components/adminui/',
        leaflet: './components/leaflet/',
        fullcalendar:'./components/fullcalendar/'
       /// d3: './components/d3'
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
      webComponents.loadGroup(components.logout_modal, body, context);
    }
    context.loadMainView = loadMainView;

    webComponents.setLog(true);
    console.log("log should be on");

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
    webComponents.register('users', webComponents.components.users);
    webComponents.register('full_calendar_page', webComponents.components.full_calendar_page);

    webComponents.register('patients', webComponents.components.patients);


    webComponents.register('contacts', webComponents.components.contacts);
    webComponents.register('medications', webComponents.components.medications);
    webComponents.register('diagnosis', webComponents.components.diagnosis);
    webComponents.register('allergies', webComponents.components.allergies);
    webComponents.register('vaccinations', webComponents.components.vaccinations);
    webComponents.register('vitals', webComponents.components.vitals);
    webComponents.register('events', webComponents.components.events);
    webComponents.register('map', webComponents.components.map_page);
    webComponents.register('full_calendar', webComponents.components.fullcalendar_page);

    // webComponents.register('d3', webComponents.components.d3_page);

    // set up the initial display prior to login

    let body = document.getElementsByTagName('body')[0];

    // The handler below is needed to ensure that all the JS resources are loaded before attempting
    // to show the modal, since this depends on jQuery being ready

    // The ready event is dispatched by the admin-root component
    //  It is available to the admin-root component via the context object which
    //  includes the ready event object

    document.addEventListener('ready', function() {
      let modal = webComponents.getComponentByName('adminui-modal-root', 'modal-login');
      modal.show();
    });

    // now load up the initial view

    webComponents.loadWebComponent('adminui-root', body, context, function(root) {
      let components = webComponents.components;
      root.setState({
        sidebar_colour: 'no-color'
      })
      root.sidebarTarget.classList.remove('sidebar-dark');
      webComponents.loadGroup(components.initial_sidebar, root.sidebarTarget, context);
      webComponents.loadGroup(components.login_modal, body, context);
      webComponents.loadGroup(components.footer, root.footerTarget, context);
    });

  });

  QEWD.start({
    application: 'pt-wc-q'
  });

});
