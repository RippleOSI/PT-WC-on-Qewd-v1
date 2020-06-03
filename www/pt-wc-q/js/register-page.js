export function define_register_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'register',
      title: 'Register',
      cardTitle: 'Register Card',
      cardTitleColour: 'warning',
      cardName: 'register-card',
      text: 'This is the Register Page content....'
    }
  };

  return {component};
};
