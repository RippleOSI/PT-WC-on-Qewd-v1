import {SidebarDivider} from "./utils/sidebar-divider.js";
import {SidebarToggler} from "./utils/sidebar-toggler.js";

function build_sidebar_card(state) {
    if (state instanceof SidebarToggler ||
        state instanceof SidebarDivider) {
        return state

    } else {
        return {
            componentName: 'ptwq-sidebar-nav-item',
            state: {
                title: (state.menu && state.menu.title) ? state.menu.title : state.title,
                icon: state.icon,
                contentPage: state.name,
                role: state.role,
            }
        }
    }
}

export function define_sidebar(QEWD, state_array) {

    let component = [];

    state_array.forEach((value,key)=>{
        component.push(build_sidebar_card(value));
    });

    let hooks = {
        'ptwq-sidebar-nav-item': {
            navItemHook: function () {

            }
        },
    }
    return {component, hooks};

};
