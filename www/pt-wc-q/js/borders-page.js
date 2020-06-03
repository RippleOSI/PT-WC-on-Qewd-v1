export function define_borders_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'borders',
      title: 'Borders',
      cardTitle: 'Borders Card',
      cardTitleColour: 'danger',
      cardName: 'borders-card',
      text: 'This is the Borders Page content....'
    }
  };

  return {component};
};
