export function define_cards_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'cards',
      title: 'Cards',
      cardTitle: 'Cards!',
      cardTitleColour: 'success',
      cardName: 'cards-card',
      text: 'This is the Cards Page content....'
    }
  };

  return {component};
};
