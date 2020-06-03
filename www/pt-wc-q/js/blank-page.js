export function define_blank_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'blank',
      title: 'Blank',
      cardTitle: 'Blank Card',
      cardTitleColour: 'info',
      cardName: 'blank-card',
      text: 'This is the Blank Page content....'
    }
  };

  return {component};
};
