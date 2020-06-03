export function define_404_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'page404',
      title: 'Page 404',
      cardTitle: 'Page 404 Card',
      cardTitleColour: 'danger',
      cardName: 'page404-card',
      text: 'This is the Page404 content....'
    }
  };

  return {component};
};
