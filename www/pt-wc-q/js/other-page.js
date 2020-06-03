export function define_other_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'other',
      title: 'Other',
      cardTitle: 'Other Card',
      cardTitleColour: 'info',
      cardName: 'other-card',
      text: 'This is the Other Page content....'
    }
  };

  return {component};
};
