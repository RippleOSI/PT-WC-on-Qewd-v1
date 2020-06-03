export function define_login_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'login',
      title: 'Login',
      cardTitle: 'Login Card',
      cardTitleColour: 'success',
      cardName: 'login-card',
      text: 'This is the Login Page content....'
    }
  };

  return {component};
};
