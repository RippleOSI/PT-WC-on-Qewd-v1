export function login_modal_assembly(QEWD) {

console.log("where is Qewd in login");  
console.log(QEWD);


    let component = {
      componentName: 'adminui-modal-root',
      state: {
        name: 'modal-login',
        static: true
      },
      children: [
        {
          componentName: 'adminui-modal-header',
          state: {
            title: 'Login'
          }
        },


       {
      componentName: 'adminui-modal-body',
            children: [   
                {
                componentName: 'adminui-form',
                state: {
                    name: 'loginForm',
                    cls: 'user'
                },
                children: [
                    {
                    componentName: 'adminui-form-field',
                    state: {
                        label: 'Username:',
                        placeholder: 'Enter username...',
                        name: 'username',
                        focus: true
                    }
                    },
                    {
                    componentName: 'adminui-form-field',
                    state: {
                        type: 'password',
                        label: 'Password:',
                        placeholder: false,
                        name: 'password'
                    }
                    }
                ]
                }
            ]
    },
    {
        componentName: 'adminui-modal-footer',
        children: [
          {
            componentName: 'adminui-button',
            state: {
              text: 'Login',
              colour: 'success',
              cls: 'btn-block'
            },
            hooks: ['login']
          }
        ]
      }
        
      ]
    };

    let hooks = {
        'adminui-button': {
          login: function() {
            //more complex keyboard handler 
            let modal = this.getParentComponent('adminui-modal-root');
            let _this = this;
            let kpfn =  function(e){
              if(e.which == 13) {
                _this.rootElement.focus();
                _this.rootElement.click();
              }
            };
            modal.addHandler(kpfn, 'keypress');   
            
            // basic click handler
            let fn = async function() {
              console.log('button was clicked!');

            // get get a pointer to the form component:
            let form = _this.getComponentByName('adminui-form', 'loginForm');
            // then send the form's field values as a QEWD WebSocket message with
            // a type of 'login'
            // the response will be returned as responseObj
            let responseObj = await QEWD.reply({
                type: 'login',
                params: form.fieldValues
            });
            if (!responseObj.message.error) {
                let modal = _this.getParentComponent('adminui-modal-root');
                modal.hide();
                modal.remove();
                _this.context.loadMainView(); 
                }


            };
            this.addHandler(fn, 'click');         
          }
        }
      };

    return {component, hooks};

  };