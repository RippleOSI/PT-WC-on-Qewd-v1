export function define_medications_page(QEWD) {

  let component = {
    componentName: 'ptwq-content-page',
    state: {
      name: 'medications',
      crud_params: {
        title: 'Medications'
      }
    },
    hooks: ['use_crud_page']
  };

  let hooks = {
    'ptwq-content-page': {
      use_crud_page: function(_state) {
        let assembly = {
          componentName: 'adminui-crud',
          state: _state.crud_params
        }
      }
    }
  };

  return {component, hooks};
};

