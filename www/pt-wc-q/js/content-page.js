

  let contentPage = {
    componentName: 'adminui-content-page',
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: '__title'
        }
      },
      {
        componentName: 'adminui-row',
        children: [
          {
            componentName: 'adminui-content-card',
            state: {
              name: '__cardName'
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                state: {
                  title: '__cardTitle',
                  title_colour: '__cardTitleColour'
                }
              },
              {
                componentName: 'adminui-content-card-body',
                state: {
                  text: '__text'
                },
                children: '__children'
              }
            ]
          }
        ]
      }
    ]
  };

  export {contentPage};
