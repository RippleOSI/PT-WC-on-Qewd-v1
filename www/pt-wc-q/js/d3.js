import {node_inspector_assembly} from '../../components/d3/components/d3-node-inspector.js';


export function define_d3_page(QEWD) {

  let nodeComponent = node_inspector_assembly(QEWD);
  console.log(nodeComponent);

  let hooks = nodeComponent.hooks;

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'd3'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Node Editor'
        }
      },      {
        componentName: 'adminui-content-card',
        state: {
          name: 'd3-card'
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Node Editor Card',
              title_colour: 'warning'
            }
          },
          {
            componentName: 'adminui-content-card-body',
            hooks: ['loadNodeInspector']
          }
        ]
      }
    ]
  };

  hooks['adminui-content-card-body'] = {
    loadNodeInspector: function() {
      console.log('loading node inspector component...');
      this.loadGroup(nodeComponent.component, this.childrenTarget, this.context);
      console.log('node inspector loaded');
    }
  };

  console.log(222222);
  console.log(hooks);

  return {component, hooks};
};
