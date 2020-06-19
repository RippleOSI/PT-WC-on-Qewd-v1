export function logout_modal_assembly(QEWD) {

    let component = {
      componentName: 'adminui-modal-root',
      state: {
        name: 'logout-modal'
      },
      children: [
        {
          componentName: 'adminui-modal-header',
          state: {
            title: 'Logout'
          },
          children: [
            {
              componentName: 'adminui-modal-close-button',
            }
          ]
        },
        {
          componentName: 'adminui-modal-body',
          state: {
            text: 'Are you sure you want to logout?'
          }
        },
        {
          componentName: 'adminui-modal-footer',
          children: [
            {
              componentName: 'adminui-modal-cancel-button',
            },
            {
              componentName: 'adminui-button',
              state: {
                text: 'Logout',
                colour: 'danger',
                cls: 'btn-block'
              },
              hooks: ['logout']
            }
          ]
        }
      ]
    };

    QEWD.on('socketDisconnected', function() {
      toastr.warning('You have successfully logged out');
      setTimeout(function() {
        location.reload();
      }, 3000);
    });

    let hooks = {
      'adminui-button': {
        logout: function() {
          let fn = async function() { 
            let responseObj = await QEWD.reply({
              type: 'logout'
            });
            QEWD.disconnectSocket();
          };
          this.addHandler(fn);
        }
      }
    };

    return {component, hooks};
  };