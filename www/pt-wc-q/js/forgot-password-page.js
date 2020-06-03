export function define_forgot_password_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'forgot_password',
      title: 'Forgot Password',
      cardTitle: 'Forgot Password Card',
      cardTitleColour: 'danger',
      cardName: 'forgot-password-card',
      text: 'This is the Forgot Password Page content....'
    }
  };

  return {component};
};
