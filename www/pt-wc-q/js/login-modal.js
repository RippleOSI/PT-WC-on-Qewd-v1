
export function define_login_modal(QEWD) {

  //          **** login modal ****

  let component = {
    componentName: 'adminui-modal-root',
    state: {
      name: 'modal-login',
      static: true
    },
    hooks: ['loadModal'],

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
        let modal = this.getParentComponent({match: 'adminui-modal-root'});
        let _this = this;

        let kpfn =  function(e){
          if(e.which == 13) {
            // click the button to submit the form
            _this.rootElement.focus();
            _this.rootElement.click();
          }
        };

        modal.addHandler(kpfn, 'keypress');

        let fn = async function() {
          let form = _this.getComponentByName('adminui-form', 'loginForm');
          let responseObj = await QEWD.reply({
            type: 'login',
            params: form.fieldValues
          });
          if (responseObj.message.error) {
            toastr.error('Invalid login attempt');
          }
          else {
            let modal = _this.getComponentByName('adminui-modal-root', 'modal-login');
            modal.hide();
            modal.remove();
            _this.context.loadMainView();

            let user = responseObj.message.response;

            _this.context.user  = user;

            console.log(_this.context);
          }
        };
        this.addHandler(fn);
      }
    },
    'adminui-modal-root': {
      loadModal: function(){
        let ctx = this.context;
        let _this = this;
        let root = _this.getComponentByName('ptwq-root', 'root');
        root.loaderVisibility(true);
        if(ctx.user) {


          setTimeout(()=>{
          QEWD.reply({
            type: 'login',
            params: {
              simpleLogin: true,
            }
          }).then((res)=>{
            console.log(ctx.user);
            let modal = _this.getComponentByName('adminui-modal-root', 'modal-login');
            modal.hide();
            modal.remove();
            _this.context.loadMainView();
          });
        },1000);
        }else{
          root.loaderVisibility(false)
        };
      }
    }

  };

  return {component, hooks};

};

