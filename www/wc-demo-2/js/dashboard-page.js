export function define_dashboard_page() {

 
  let component = {
    componentName: 'contentPage',
    state: {
      name: 'dashboard',
      show: true,
      title: 'Dashboard',
      cardTitle: 'Dashboard Card',
      cardTitleColour: 'danger',
      cardName: 'dashboard-card'
    },
    children: [
      {
        componentName: 'adminui-span',
        hooks: ['addContent']
      }
    ]
  };

 const html_fragment = `
 <div>Hello Big World!!</div>
    
    <p>Use Font Awesome Icons (included with this theme package) along with the circle buttons as shown in the examples below!</p>
    <!-- Circle Buttons (Default) -->
    <div class="mb-2">
    <code>.btn-circle</code>
    </div>
    <a href="#" class="btn btn-primary btn-circle">
    <i class="fab fa-facebook-f"></i>
    </a>
    <a href="#" class="btn btn-success btn-circle">
    <i class="fas fa-check"></i>
    </a>
    <a href="#" class="btn btn-info btn-circle">
    <i class="fas fa-info-circle"></i>
    </a>
    <a href="#" class="btn btn-warning btn-circle">
    <i class="fas fa-exclamation-triangle"></i>
    </a>
    <a href="#" class="btn btn-danger btn-circle">
    <i class="fas fa-trash"></i>
    </a>
    <!-- Circle Buttons (Small) -->
    <div class="mt-4 mb-2">
    <code>.btn-circle .btn-sm</code>
    </div>
    <a href="#" class="btn btn-primary btn-circle btn-sm">
    <i class="fab fa-facebook-f"></i>
    </a>
    <a href="#" class="btn btn-success btn-circle btn-sm">
    <i class="fas fa-check"></i>
    </a>
    <a href="#" class="btn btn-info btn-circle btn-sm">
    <i class="fas fa-info-circle"></i>
    </a>
    <a href="#" class="btn btn-warning btn-circle btn-sm">
    <i class="fas fa-exclamation-triangle"></i>
    </a>
    <a href="#" class="btn btn-danger btn-circle btn-sm">
    <i class="fas fa-trash"></i>
    </a>
    <!-- Circle Buttons (Large) -->
    <div class="mt-4 mb-2">
    <code>.btn-circle .btn-lg</code>
    </div>
    <a href="#" class="btn btn-primary btn-circle btn-lg">
    <i class="fab fa-facebook-f"></i>
    </a>
    <a href="#" class="btn btn-success btn-circle btn-lg">
    <i class="fas fa-check"></i>
    </a>
    <a href="#" class="btn btn-info btn-circle btn-lg">
    <i class="fas fa-info-circle"></i>
    </a>
    <a href="#" class="btn btn-warning btn-circle btn-lg">
    <i class="fas fa-exclamation-triangle"></i>
    </a>
    <a href="#" class="btn btn-danger btn-circle btn-lg">
    <i class="fas fa-trash"></i>
    </a>
 `;

  let hooks = {
    'adminui-span': {
    addContent: function() {
    this.rootElement.innerHTML = html_fragment;
    //this.html = '${html}';
        }
      }
    };

  return {component, hooks};

};
