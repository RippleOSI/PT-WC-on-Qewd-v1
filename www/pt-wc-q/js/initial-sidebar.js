export function define_initial_sidebar(e) {
  console.log(e);
  let component = {
    componentName: 'adminui-sidebar-brand',
    state: {
      title: ' ',
      contentPage: 'dashboard',
      image: {
        src: 'img/pulsetile-logo.png',
        width: '100%'
      }
    }
  };

  return {component};
};
