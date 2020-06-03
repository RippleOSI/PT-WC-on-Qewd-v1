export function define_buttons_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'buttons',
      title: 'Buttons',
      cardTitle: 'Buttons Card',
      cardTitleColour: 'primary',
      cardName: 'buttons-card',
      text: 'This is the Buttons Page content....'
    }
  };

  return {component};
};
