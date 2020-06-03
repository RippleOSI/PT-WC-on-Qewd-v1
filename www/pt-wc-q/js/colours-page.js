export function define_colours_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'colours',
      title: 'Colours',
      cardTitle: 'Colours Card',
      cardTitleColour: 'warning',
      cardName: 'colours-card',
      text: 'This is the Colours Page content....'
    }
  };

  return {component};
};
