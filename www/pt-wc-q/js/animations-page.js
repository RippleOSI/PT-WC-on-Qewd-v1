export function define_animations_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'animations',
      title: 'Animations',
      cardTitle: 'Animations Card',
      cardTitleColour: 'info',
      cardName: 'animations-card',
      text: 'This is the Animations Page content....'
    }
  };

  return {component};
};
